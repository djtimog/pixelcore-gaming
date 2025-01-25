import { integer, pgTable, varchar, text, boolean, date, jsonb } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(), // Use bcrypt for password hashing
  role: varchar({ length: 50 }).default("player"), // e.g., "admin", "player", "team_manager"
  created_at: date().defaultNow(),
  imageUrl:varchar('imageUrl'),
  subscription: boolean("subscription").$default(()=>false),
  verified: boolean("verified").$default(()=>false),
});

// Tournament Table
export const tournamentsTable = pgTable("tournaments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  start_date: date().notNull(),
  end_date: date().notNull(),
  registration_start_date: date().notNull(),
  registration_end_date: date().notNull(),
  game_id: integer().notNull(), // Foreign key to the games table
  organizer_id: integer().notNull(), // Foreign key to users table
  prize_pool: varchar({ length: 255 }).default("0"), // Optional prize pool
});

// Teams Table
export const teamsTable = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  logo_url: varchar({ length: 255 }), // Optional team logo
  captain_id: integer().notNull(), // Foreign key to users table
  created_at: date().defaultNow(),
});

// Players Table
export const playersTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().unique(), // Foreign key to users table
  team_id: integer(), // Foreign key to teams table
  game_handle: varchar({ length: 255 }), // In-game username
  rank: varchar({ length: 100 }), // Optional in-game rank
});

// Games Table
export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  genre: varchar({ length: 255 }), // Optional game genre
  platform: varchar({ length: 255 }), // e.g., PC, console, mobile
  publisher: varchar({ length: 255 }), // Optional publisher info
});

// Game-Specific Tournament Details
export const gameDetailsTable = pgTable("game_details", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tournament_id: integer().notNull(), // Foreign key to tournaments table
  rules: text().notNull(), // Game-specific rules for the tournament
  max_teams: integer().notNull(),
  max_players_per_team: integer().notNull(),
  additional_info: jsonb(), // Store any additional game-specific data
});

export const adminsTable = pgTable("admins", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().unique(), // Foreign key to users table
  role: varchar({ length: 50 }).default("admin"), // e.g., "super_admin", "tournament_admin"
  permissions: varchar({ length: 255 }).default("full_access"), // Optional permissions field
  created_at: date().defaultNow(),
});