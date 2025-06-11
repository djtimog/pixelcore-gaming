import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import {
  matchesTable,
  playersTable,
  starredTournamentsTable,
  teamRegistrationsTable,
  teamsTable,
  tournamentAnnouncementsTable,
  tournamentFeedbackTable,
  tournamentRoomsTable,
  tournamentsTable,
  usersTable,
} from "@/config/schema";
import { GameType } from "@/components/ui/dashboard/card/game";

export const Get = {
  UserById: async (id: number) => {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1);

      return user[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  },
  UserByEmail: async (email: string) => {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      return user[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  },

  PlayerByUserId: async (userId: number) => {
    try {
      const player = await db
        .select()
        .from(playersTable)
        .where(eq(playersTable.userId, userId));

      return player[0];
    } catch (error) {
      console.error("Error fetching player by user ID:", error);
      return null;
    }
  },

  PlayerById: async (id: number) => {
    try {
      const player = await db
        .select()
        .from(playersTable)
        .where(eq(playersTable.id, id))
        .limit(1);

      return player[0];
    } catch (error) {
      console.error("Error fetching player by ID:", error);
      return null;
    }
  },

  TeamBySecretCode: async (secretCode: string) => {
    try {
      const team = await db
        .select()
        .from(teamsTable)
        .where(eq(teamsTable.secretCode, secretCode));
      return team[0];
    } catch (error) {
      console.error("Error fetching team by secret code:", error);
      return null;
    }
  },

  TeamById: async (id: number) => {
    try {
      const team = await db
        .select()
        .from(teamsTable)
        .where(eq(teamsTable.id, id));
      return team[0];
    } catch (error) {
      console.error("Error fetching team by id code:", error);
      return null;
    }
  },

  Games: async (): Promise<GameType[]> => {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch games");

    const data = await res.json();

    const filtered = data.results.map((game: GameType) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        esrb_rating: game.esrb_rating
          ? { name: game.esrb_rating.name }
          : undefined,
        platforms: game.platforms.map((platform) => ({
          platform: {
            id: platform.platform.id,
            name: platform.platform.name,
          },
          requirements: platform.requirements
            ? {
                minimum: platform.requirements.minimum,
                recommended: platform.requirements.recommended,
              }
            : undefined,
        })),
      };
    });

    return filtered;
  },

  TeamByCaptainId: async (captainId: number) => {
    try {
      const team = await db
        .select()
        .from(teamsTable)
        .where(eq(teamsTable.captainId, captainId));
      return team[0];
    } catch (error) {
      console.error("Error fetching team by captain ID:", error);
      return null;
    }
  },

  PlayersByTeamId: async (teamId: number) => {
    try {
      return await db
        .select()
        .from(playersTable)
        .where(eq(playersTable.teamId, teamId));
    } catch (error) {
      console.error("Error fetching players by team ID:", error);
      return [];
    }
  },

  Tournaments: async () => {
    try {
      const tournaments = await db.select().from(tournamentsTable);
      return tournaments;
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      return [];
    }
  },

  TournamentByUid: async (uid: string) => {
    try {
      const tournament = await db
        .select()
        .from(tournamentsTable)
        .where(eq(tournamentsTable.uid, uid))
        .limit(1);
      return tournament[0];
    } catch (error) {
      console.error("Error fetching tournament by UID:", error);
      return null;
    }
  },

  StarredTournamentByPlayerId: async (playerId: number) => {
    try {
      const starredTournaments = await db
        .select()
        .from(starredTournamentsTable)
        .where(eq(starredTournamentsTable.playerId, playerId));
      return starredTournaments;
    } catch (error) {
      console.error("Error fetching starred tournaments by player ID:", error);
      return [];
    }
  },

  UsersByReferredBy: async (referredBy: number) => {
    try {
      const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.referredBy, referredBy));
      return users;
    } catch (error) {
      console.error("Error fetching users by referredBy:", error);
      return [];
    }
  },

  TeamRegistrationsByTournamentId: async (tournamentId: number) => {
    try {
      const registrations = await db
        .select()
        .from(teamRegistrationsTable)
        .where(eq(teamRegistrationsTable.tournamentId, tournamentId));
      return registrations;
    } catch (error) {
      console.error(
        "Error fetching team registrations by tournament ID:",
        error,
      );
      return [];
    }
  },

  AnnouncementsByTournamentId: async (tournamentId: number) => {
    try {
      const announcements = await db
        .select()
        .from(tournamentAnnouncementsTable)
        .where(eq(tournamentAnnouncementsTable.tournamentId, tournamentId));
      return announcements;
    } catch (error) {
      console.error("Error fetching announcements by tournament ID:", error);
      return [];
    }
  },

  MatchesByTournamentId: async (tournamentId: number) => {
    try {
      const matches = await db
        .select()
        .from(matchesTable)
        .where(eq(matchesTable.tournamentId, tournamentId));
      return matches;
    } catch (error) {
      console.error("Error fetching matches by tournament ID:", error);
      return [];
    }
  },

  FeedbackByTournamentId: async (tournamentId: number) => {
    try {
      const feedback = await db
        .select()
        .from(tournamentFeedbackTable)
        .where(eq(tournamentFeedbackTable.tournamentId, tournamentId));
      return feedback;
    } catch (error) {
      console.error("Error fetching feedback by tournament ID:", error);
      return [];
    }
  },

  RoomByTournamentId: async (tournamentId: number) => {
    try {
      const room = await db
        .select()
        .from(tournamentRoomsTable)
        .where(eq(tournamentRoomsTable.tournamentId, tournamentId))
        .limit(1);
      return room[0];
    } catch (error) {
      console.error("Error fetching room by tournament ID:", error);
      return null;
    }
  },
};
