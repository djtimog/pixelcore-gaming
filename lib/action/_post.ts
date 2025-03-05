'use server'
import { db } from "@/config/db";
import { playersTable, teamsTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import {
  PlayerData,
  UpdateTeamData,
  UpdateUserData,
  UserData,
} from "../placeholder-data";

export const Post = {
  UserData: (userData: UserData) => {
    return db.insert(usersTable).values(userData);
  },
  PlayerData: (playerData: PlayerData) => {
    return db.insert(playersTable).values(playerData);
  },
  TeamData: (teamData: UpdateTeamData) => {
    return db.insert(teamsTable).values(teamData);
  },
};

export const Update = {
  UserData: (userId: number, updataData: UpdateUserData) => {
    return db
      .update(usersTable)
      .set(updataData)
      .where(eq(usersTable.id, userId));
  },
  TeamData: (teamId: number, teamData: UpdateTeamData) => {
    return db.update(teamsTable).set(teamData).where(eq(teamsTable, teamId));
  },
};

export const Delete = {
  Player: (playerId: number) => {
    return playerId;
  },
};
