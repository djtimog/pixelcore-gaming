import { eq } from "drizzle-orm";

// Define the games array
const games = [
  {
    name: "Call of Duty",
    genre: "First-Person Shooter",
    platform: "PC, PlayStation, Xbox, Mobile",
    publisher: "Activision",
    images: JSON.stringify({
      PC: "/games/cod-pc.jpg",
      PlayStation: "/games/cod-ps.jpg",
      Xbox: "/games/cod-xbox.avif",
      Mobile: "/games/cod-mobile.jpg",
    }),
  },
  {
    name: "League of Legends",
    genre: "MOBA",
    platform: "PC",
    publisher: "Riot Games",
    images: JSON.stringify({
      PC: "/games/lol-pc.webp",
    }),
  },
  {
    name: "Minecraft",
    genre: "Sandbox",
    platform: "PC, Mobile, PlayStation",
    publisher: "Mojang Studios",
    images: JSON.stringify({
      PC: "/games/minecraft-pc.jpeg",
      PlayStation: "/games/minecraft-ps.avif",
      Mobile: "/games/minecraft-mobile.png",
    }),
  },
  {
    name: "Fortnite",
    genre: "Battle Royale",
    platform: "PC, PlayStation, Xbox, Mobile",
    publisher: "Epic Games",
    images: JSON.stringify({
      PC: "/games/fortnite-pc.jpg",
      PlayStation: "/games/fortnite-ps.jpeg",
      Xbox: "/games/fortnite-xbox.jpg",
      Mobile: "/games/fortnite-mobile.webp",
    }),
  },
  {
    name: "Valorant",
    genre: "First-Person Shooter",
    platform: "PC",
    publisher: "Riot Games",
    images: JSON.stringify({
      PC: "/games/valorant-pc.jpg",
    }),
  },
  {
    name: "Apex Legends",
    genre: "Battle Royale",
    platform: "PC, PlayStation, Xbox, Mobile",
    publisher: "Electronic Arts",
    images: JSON.stringify({
      PC: "/games/apex-pc.jpeg",
      PlayStation: "/games/apex-ps.webp",
      Xbox: "/games/apex-xbox.webp",
      Mobile: "/games/apex-mobile.jpeg",
    }),
  },
  {
    name: "PUBG: Battlegrounds",
    genre: "Battle Royale",
    platform: "PC, PlayStation, Xbox, Mobile",
    publisher: "Krafton",
    images: JSON.stringify({
      PC: "/games/pubg-pc.webp",
      PlayStation: "/games/pubg-ps.webp",
      Xbox: "/games/pubg-xbox.webp",
      Mobile: "/games/pubg-mobile.jpeg",
    }),
  },
];

// Function to insert games into the database
async function seedGames() {
  try {
    for (const game of games) {
      // Check if the game already exists
      const existingGame = await db
        .select()
        .from(gamesTable)
        .where(eq(gamesTable.name, game.name));

      if (existingGame.length === 0) {
        await db.insert(gamesTable).values(game);
        console.log(`Inserted: ${game.name}`);
      } else {
        console.log(`Skipped (Already Exists): ${game.name}`);
      }
    }
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding games:", error);
  }
}

// Run the function
seedGames();

import React from "react";
import { Button } from "./ui/button";
import { gamesTable } from "@/config/schema";
import { db } from "@/config/db";

const GameButton = () => {
  return <Button onClick={() => seedGames()}>submit games</Button>;
};

export default GameButton;
