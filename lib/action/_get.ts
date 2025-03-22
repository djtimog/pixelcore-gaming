import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import {
  gamesTable,
  playersTable,
  teamsTable,
  usersTable,
} from "@/config/schema";

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

  Games: async () => {
    return await db.select().from(gamesTable);
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
};
