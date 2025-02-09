import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { playersTable, usersTable } from "@/config/schema";

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
};
 