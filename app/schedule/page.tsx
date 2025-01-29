"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { db } from "@/config/db";
import { tournamentsTable, gamesTable } from "@/config/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validation Schema
const ScheduleSchema = z.object({
  name: z.string().min(3, "Tournament name is required"),
  description: z.string().optional(),
  game_id: z.string().min(1, "Select a game"),
  start_date: z.string().min(1, "Select start date"),
  end_date: z.string().min(1, "Select end date"),
  registration_start_date: z.string().min(1, "Select registration start date"),
  registration_end_date: z.string().min(1, "Select registration end date"),
  max_players_or_teams: z.number().min(2, "Must allow at least 2 teams/players"),
  prize_pool: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export default function ScheduleTournamentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  // Fetch games from DB
  useEffect(() => {
    async function fetchGames() {
      const gameData = await db.select().from(gamesTable);
      setGames(gameData);
    }
    fetchGames();
  }, []);

  // Form Setup
  const form = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      name: "",
      description: "",
      game_id: "",
      start_date: "",
      end_date: "",
      registration_start_date: "",
      registration_end_date: "",
      max_players_or_teams: 2,
      prize_pool: "",
    },
  });

  // Submit Handler
  async function onSubmit(data: z.infer<typeof ScheduleSchema>) {
    setIsLoading(true);

    try {
      // Upload Image (if provided)
      let imageUrl = "";
      if (data.image) {
        const formData = new FormData();
        formData.append("file", data.image);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Insert into DB
      await db.insert(tournamentsTable).values({
        name: data.name,
        description: data.description,
        game_id: parseInt(data.game_id),
        start_date: data.start_date,
        end_date: data.end_date,
        registration_start_date: data.registration_start_date,
        registration_end_date: data.registration_end_date,
        prize_pool: data.prize_pool,
        organizer_id: 1, // Change this to dynamic user ID
      });

      toast({ title: "Success!", description: "Tournament scheduled successfully." });
      router.push("/tournaments");
    } catch (error) {
      console.error("Error scheduling tournament:", error);
      toast({ title: "Submission Failed", description: "An error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <p className="uppercase text-2xl text-center">Schedule a Tournament</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="game_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Game</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select Game" /></SelectTrigger>
                <SelectContent>
                  {games.map(game => (
                    <SelectItem key={game.id} value={String(game.id)}>{game.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="start_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="end_date" render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="registration_start_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Start Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="registration_end_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Registration End Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="max_players_or_teams" render={({ field }) => (
            <FormItem>
              <FormLabel>Max Teams/Players</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="prize_pool" render={({ field }) => (
            <FormItem>
              <FormLabel>Prize Pool</FormLabel>
              <FormControl><Input type="text" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Scheduling..." : "Schedule Tournament"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
