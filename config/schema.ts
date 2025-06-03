import {
  time,
  serial,
  timestamp,
  integer,
  pgTable,
  varchar,
  text,
  boolean,
  date,
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).default("player"), // e.g., "admin", "player", "team_manager"
  createdAt: timestamp("created_at").defaultNow(),
  imageUrl: varchar("image_url", { length: 255 }), // Optional profile image URL
  isSubscribed: boolean("is_subscribed").default(false),
  isVerified: boolean("is_verified").default(false),
  phoneNumber: varchar("phone_number", { length: 15 }), // Optional phone number
  discordHandle: varchar("discord_handle", { length: 50 }), // Optional Discord handle
  referredBy: integer("referred_by"),
});

// Games Table
export const gamesTable = pgTable("games", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 255 }), // Optional game genre
  platform: varchar("platform", { length: 255 }), // e.g., PC, console, mobile
  publisher: varchar("publisher", { length: 255 }), // Optional publisher info
  images: varchar("images", { length: 1024 }).notNull(), // JSON stringified image URLs
});

// Teams Table
export const teamsTable = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: varchar("logo_url", { length: 255 }), // Optional team logo
  captainId: integer("captain_id")
    .notNull()
    .references(() => usersTable.id), // Foreign key to users table
  secretCode: varchar("secret_code", { length: 7 })
    .notNull()
    .default(generateSecretCode()), // Auto-generated
  createdAt: timestamp("created_at").defaultNow(),
  gameId: integer("game_id")
    .notNull()
    .references(() => gamesTable.id), // Foreign key to games table
  uid: varchar("uid", { length: 255 }).notNull(), // Unique identifier for the player
});

// Players Table
export const playersTable = pgTable("players", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id), // Foreign key to users table
  teamId: integer("team_id").references(() => teamsTable.id), // Foreign key to teams table
  gameId: integer("game_id")
    .notNull()
    .references(() => gamesTable.id), // Game name
  gameHandle: varchar("game_handle", { length: 255 }), // In-game username
  rank: varchar("rank", { length: 100 }), // Optional in-game rank
  uid: varchar("uid", { length: 255 }).notNull(), // Unique identifier for the player
  level: integer("level").default(1), // Optional player level
  isCaptain: boolean("is_captain").default(false), // Is the player a team captain?
});

// Tournaments Table
export const tournamentsTable = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  uid: varchar("uid", { length: 255 }).notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(), // Optional URL
  registrationStartDate: date("registration_start_date").notNull(),
  registrationEndDate: date("registration_end_date").notNull(),
  gameId: integer("game_id").notNull(),
  organizerId: integer("organizer_id")
    .notNull()
    .references(() => usersTable.id), // Foreign key to users table
  prizePool: varchar("prize_pool", { length: 255 }).default("0"), // Optional prize pool
  maxTeams: integer("max_teams").notNull(), // Maximum number of teams allowed
  maxPlayersPerTeam: integer("max_players_per_team").notNull(), // Maximum players per team
  rules: text("rules"), // Tournament rules
  status: varchar("status", { length: 50 }).default("upcoming"), // e.g., "upcoming", "ongoing", "completed"
  time: varchar("time", { length: 50 }).default("00:00"), // Time of the tournament
  registrationStatus: varchar("registration_status", { length: 50 }).default(
    "open",
  ), // e.g., "open", "closed"
  timezone: varchar("timezone", { length: 50 }).default("UTC"), // Timezone for the tournament
});

// Matches Table
export const matchesTable = pgTable("matches", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournamentsTable.id), // Foreign key to tournaments table
  gameId: integer("game_id")
    .notNull()
    .references(() => gamesTable.id), // Foreign key to games table
  matchDate: date("match_date").notNull(), // Date of the match
  matchTime: time("match_time").notNull(), // Time of the match
  round: varchar("round", { length: 50 }).notNull(), // e.g., "group stage", "quarter-finals", "semi-finals", "finals"
  status: varchar("status", { length: 50 }).default("scheduled"), // e.g., "scheduled", "ongoing", "completed"
  winnerTeamId: integer("winner_team_id").references(() => teamsTable.id), // Foreign key to teams table (optional, populated after match completion)
  createdAt: timestamp("created_at").defaultNow(),
});

// Match Teams Table (Many-to-Many relationship between matches and teams)
export const matchTeamsTable = pgTable("match_teams", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .notNull()
    .references(() => matchesTable.id, { onDelete: "cascade" }),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id, { onDelete: "cascade" }),
});

// Admins Table
export const adminsTable = pgTable("admins", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id), // Foreign key to users table
  role: varchar("role", { length: 50 }).default("admin"), // e.g., "super_admin", "tournament_admin"
  permissions: varchar("permissions", { length: 255 }).default("full_access"), // Optional permissions field
  createdAt: timestamp("created_at").defaultNow(),
});

// Helper function to generate a secret code for teams
function generateSecretCode(): string {
  return Math.random().toString(36).slice(2, 9).toUpperCase(); // 7-character alphanumeric code
}
export const teamRegistrationsTable = pgTable("team_registrations", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournamentsTable.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id),
  isAccepted: boolean("is_accepted").default(false), // Set true when accepted by organizer
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const tournamentRoomsTable = pgTable("tournament_rooms", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournamentsTable.id),
  matchId: integer("match_id").references(() => matchesTable.id), // Optional, for specific match
  roomLink: varchar("room_link", { length: 512 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const starredTournamentsTable = pgTable("starred_tournaments", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournamentsTable.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => playersTable.id),
  starredAt: timestamp("starred_at").defaultNow(),
});

export const teamInvitesTable = pgTable("team_invites", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => playersTable.id),
  status: varchar("status", { length: 50 }).default("pending"), // pending, accepted, declined
  sentAt: timestamp("sent_at").defaultNow(),
});

export const matchResultsTable = pgTable("match_results", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .notNull()
    .references(() => matchesTable.id),
  teamId: integer("team_id").references(() => teamsTable.id),
  playerId: integer("player_id").references(() => playersTable.id),
  score: integer("score").notNull(),
  isWinner: boolean("is_winner").default(false),
});

export const playerMatchParticipationTable = pgTable(
  "player_match_participation",
  {
    id: serial("id").primaryKey(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matchesTable.id),
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id),
    teamId: integer("team_id")
      .notNull()
      .references(() => teamsTable.id),
  },
);

export const tournamentAnnouncementsTable = pgTable(
  "tournament_announcements",
  {
    id: serial("id").primaryKey(),
    tournamentId: integer("tournament_id")
      .notNull()
      .references(() => tournamentsTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    postedAt: timestamp("posted_at").defaultNow(),
  },
);

export const tournamentFeedbackTable = pgTable("tournament_feedback", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournamentsTable.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => playersTable.id),
  rating: integer("rating").notNull(), // e.g., 1 to 5 stars
  comments: text("comments"), // Optional feedback comments
  submittedAt: timestamp("submitted_at").defaultNow(),
});
