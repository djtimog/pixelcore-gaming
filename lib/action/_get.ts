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

  Games: async (search = "") => {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch games");
  
    const data = await res.json();
  
    // Define keywords to look for in tournament-friendly games
    const tournamentKeywords = [
      "multiplayer",
      "online",
      "competitive",
      "battle",
      "shooter",
      "fps",
      "tournament",
      "soccer",
      "fighting",
      "esports",
      "match",
      "arena",
      "team",
      "call of duty",
      "valorant",
      "fifa",
      "csgo",
      "rocket league",
      "pubg",
      "fortnite",
      "apex",
      "overwatch",
      "league of legends",
      "dota",
    ];
  
    // Filter games based on the name or genre/description (if available)
    const filtered = data.results.filter((game: any) => {
      const combinedText =
        `${game.name} ${game.slug} ${game.genres?.map((g: any) => g.name).join(" ")}`.toLowerCase();
      return tournamentKeywords.some((kw) => combinedText.includes(kw));
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
};
