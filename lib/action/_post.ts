import { db } from "@/config/db";
import { playersTable, teamsTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { PlayerData, TeamData, updateUserData, UserData } from "../placeholder-data";

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
  },
  TeamData: (teamData: TeamData) => {
    return db
      .insert(teamsTable)
      .values(teamData)
  },
  UpdateTeam: (existingTeamId:any, teamData: TeamData) => {
    return existingTeamId&&teamData;
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

export const Delete = {
  Player: (playerId:number)=>{
    return playerId;
  }
}