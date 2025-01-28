"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";
import { playersTable, teamsTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  game_handle: z.string().min(5, { message: "Game handle is required." }),
  rank: z.string().optional(),
  UID: z.string().min(7, { message: "UID is required." }),
  secret_code: z.string().optional(),
});

export default function PlayerSignUpForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [teamId, setTeamId] = useState<number | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      game_handle: "",
      rank: "",
      UID: "",
      secret_code: "",
    },
  });

  // Handle team lookup based on secret code
  const handleTeamLookup = async (secret_code: string) => {
    if (!secret_code) return;

    try {
      const team = await db
        .select()
        .from(teamsTable)
        .where(eq(teamsTable.secret_code, secret_code));

      if (team.length > 0) {
        setTeamId(team[0].id);
        toast({ title: "Team found!", description: `You joined ${team[0].name}.` });
      } else {
        setTeamId(null);
        toast({ title: "Invalid Code", description: "No team found with this secret code.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error finding team:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving the player to team",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
  
    try {
      if (!user) {
        toast({ title: "Error", description: "User not authenticated.", variant: "destructive" });
        return;
      }
  
      const userEmail = user.emailAddresses[0]?.emailAddress || "";
      const userName = user.username || "";
  
      // Find user_id in the database using email and username
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, userEmail))
        .limit(1);
  
      if (existingUser.length === 0 || existingUser[0].user_name !== userName) {
        toast({ title: "Error", description: "User not found in the database.", variant: "destructive" });
        return;
      }
  
      const userId = existingUser[0].id; // Extract user_id from DB
  
      // Check if the player already exists
      const existingPlayer = await db
        .select()
        .from(playersTable)
        .where(eq(playersTable.user_id, userId))
        .limit(1);
  
      if (existingPlayer.length > 0) {
        toast({ title: "Error", description: "You are already registered as a player.", variant: "destructive" });
        return;
      }
  
      // Insert player into the database
      await db.insert(playersTable).values({
        user_id: userId, // Now correctly retrieved from DB
        team_id: teamId, // This should be fetched from secret_code
        game_handle: data.game_handle,
        rank: data.rank,
        UID: data.UID,
      });
  
      toast({ title: "Success!", description: "Player registered successfully." });
      router.push("/schedule");
    } catch (error) {
      console.error("Error saving player:", error);
      toast({ title: "Submission Failed", description: "An error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <main>
      <p className="uppercase outlined-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        Player Sign Up
      </p>
      <section>
        <div className="max-w-5xl m-auto w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-5 md:p-11">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Game Handle */}
                <FormField
                  control={form.control}
                  name="game_handle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Handle</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your in-game username" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rank */}
                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rank</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your in-game rank (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* UID */}
                <FormField
                  control={form.control}
                  name="UID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player UID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your unique game ID" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Team Secret Code (Optional) */}
                <FormField
                  control={form.control}
                  name="secret_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Secret Code (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter team secret code (optional)"
                          onBlur={(e) => handleTeamLookup(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full hover:bg-[#14C570] bg-[#00ff00]" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
