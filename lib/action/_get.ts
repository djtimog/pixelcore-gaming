'use server'
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
  PlayerByUserId: (userId: number) => {
    return db
      .select()
      .from(playersTable)
      .where(eq(playersTable.userId, userId));
  },
  TeamBySecretCode: (secretCode: string) => {
    return db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.secretCode, secretCode));
  },
  Games: () => {
    return db.select().from(gamesTable);
  },
  TeamByCaptainId: (captainId: number) => {
    return db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.captainId, captainId));
  },
  PlayersByTeamId: (teamId: number) => {
    return db
      .select()
      .from(playersTable)
      .where(eq(playersTable.teamId, teamId));
  },
};
