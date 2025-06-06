import { db } from "@/config/db";
import {
  matchesTable,
  playersTable,
  starredTournamentsTable,
  teamsTable,
  tournamentsTable,
  usersTable,
} from "@/config/schema";
import { eq } from "drizzle-orm";
import {
  PlayerData,
  UpdateTeamData,
  UpdateUserData,
  UserData,
  TournamentData,
  MatchData,
} from "../placeholder-data";

export const Post = {
  UserData: (userData: UserData) => {
    return db.insert(usersTable).values(userData);
  },
  PlayerData: (playerData: PlayerData) => {
    return db.insert(playersTable).values(playerData);
  },
  // TeamData: (teamData: UpdateTeamData) => {
  //   return db.insert(teamsTable).values(teamData);
  // },
  TournamentData: (tournamentData: TournamentData) => {
    return db.insert(tournamentsTable).values(tournamentData);
  },
  StarTournament: (tournamentId: number, playerId: number) => {
    return db.insert(starredTournamentsTable).values({
      tournamentId,
      playerId,
    });
  },
  MatchData: (matchData: MatchData) => {
    return db.insert(matchesTable).values(matchData);
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
    return db.update(teamsTable).set(teamData).where(eq(teamsTable.id, teamId));
  },
  TournamentRegistrationStatus: (
    tournamnetId: number,
    tournamentData: { registrationStatus: string },
  ) => {
    return db
      .update(tournamentsTable)
      .set(tournamentData)
      .where(eq(tournamentsTable.id, tournamnetId));
  },
};

export const Delete = {
  Player: (playerId: number) => {
    return playerId;
  },
  StarTournament: (starTournamentId: number) => {
    return db
      .delete(starredTournamentsTable)
      .where(eq(starredTournamentsTable.id, starTournamentId));
  },
};
