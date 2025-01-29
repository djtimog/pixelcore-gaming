"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/config/db";
import { matchesTable, teamsTable, gamesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

// Validation Schema
const FormSchema = z.object({
  teams: z.array(z.string()).min(2, { message: "Select at least two teams" }),
  game_id: z.string().min(1, { message: "Select Game" }),
  match_date: z.string().min(1, { message: "Select Match Date" }),
  match_time: z.string().min(1, { message: "Select Match Time" }),
});

export default function ScheduleMatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [games, setGames] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTeams() {
      const teamData = await db.select().from(teamsTable);
      setTeams(teamData);
    }

    async function fetchGames() {
      const gameData = await db.select().from(gamesTable);
      setGames(gameData);
    }

    fetchTeams();
    fetchGames();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teams: [""],
      game_id: "",
      match_date: "",
      match_time: "",
    },
  });

  const { fields, append, remove } = useFieldArray<string>({
    control: form.control,
    name: "teams",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await db.insert(matchesTable).values({
        team_ids: data.teams.map(id => parseInt(id)),
        game_id: parseInt(data.game_id),
        match_date: data.match_date,
        match_time: data.match_time,
      });

      toast({ title: "Success!", description: "Match scheduled successfully." });
      router.push("/matches");
    } catch (error) {
      console.error("Error scheduling match:", error);
      toast({ title: "Submission Failed", description: "An error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <p className="uppercase outlined-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
        Schedule a Match
      </p>
      <section>
        <div className="max-w-4xl mx-auto p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Dynamic Team Selection */}
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`teams.${index}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team {index + 1}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger><SelectValue placeholder={`Select Team ${index + 1}`} /></SelectTrigger>
                        <SelectContent>
                          {teams.map(team => (
                            <SelectItem key={team.id} value={String(team.id)}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      {index > 1 && (
                        <Button type="button" onClick={() => remove(index)} variant="destructive">
                          Remove
                        </Button>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" onClick={() => append("")}>Add Team</Button>

              {/* Game Selection */}
              <FormField
                control={form.control}
                name="game_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select Game" /></SelectTrigger>
                      <SelectContent>
                        {games.map(game => (
                          <SelectItem key={game.id} value={String(game.id)}>
                            {game.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Match Date */}
              <FormField
                control={form.control}
                name="match_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Match Time */}
              <FormField
                control={form.control}
                name="match_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#00ff00] hover:bg-[#14C570]" disabled={isLoading}>
                {isLoading ? "Scheduling..." : "Schedule Match"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
