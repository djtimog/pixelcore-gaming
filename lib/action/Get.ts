import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { gamesTable, playersTable, teamsTable, usersTable } from "@/config/schema";

export const Get = {
  UserByEmail: (userEmail: string) => {
    return db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));
  },
  PlayerByUserId: (userId: number) => {
    return db
      .select()
      .from(playersTable)
      .where(eq(playersTable.userId, userId));
  },
  TeamBySecretCode:  (secretCode:string) => {
    return db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.secretCode, secretCode));
  },
  Games: () => {
    return db
      .select()
      .from(gamesTable)
  },
};
 