import { eq } from "drizzle-orm";
import React from "react";
import { Button } from "./ui/button";
import { gamesTable } from "@/config/schema";
import { db } from "@/config/db";
import { games } from "@/lib/data";
// Define the games array


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
// seedGames();

const GameButton = () => {
  return <Button onClick={() => seedGames()}>submit games</Button>;
};

export default GameButton;
