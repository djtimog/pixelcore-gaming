import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import {
  playersTable,
  starredTournamentsTable,
  teamsTable,
  tournamentsTable,
  usersTable,
} from "@/config/schema";
import { GameType } from "@/components/ui/dashboard/card/game";


export const Get = {
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

  Games: async (): Promise<GameType[]> => {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch games");

    const data = await res.json();

    const filtered = data.results.map((game:GameType) => {
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
};
