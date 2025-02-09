import { db } from "@/config/db";
import { playersTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { PlayerData, updateUserData, UserData } from "../placeholder-data";

export const Post = {
  UserData: (userData: UserData) => {
    return db
        .insert(usersTable)
        .values(userData);
  },
  PlayerData: (playerData: PlayerData) => {
    return db
        .insert(playersTable)
        .values(playerData);
  }
};

export const Update = {
    UserData: ( userId :number, updataData: updateUserData)=>{
        return db
        .update(usersTable)
        .set(updataData)
        .where(eq(usersTable.id, userId));
    },
}