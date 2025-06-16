"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCheck } from "lucide-react";
import { PlayerFormValues } from "@/lib/placeholder-data";
import { PlayerFormSchema } from "@/lib/form-schema";
import { handleTeamLookup } from "@/lib/team-look-up";
import { lookUpGames } from "@/lib/games-look-up";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";

export default function PlayerSignUpForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [teamId, setTeamId] = useState<number | null>(null);
  const router = useRouter();
  const [gameNames, setGameNames] = useState<string[]>([]);

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: {
      game: gameNames[0] || "",
      game_handle: "",
      rank: "",
      uid: "",
      level: 1,
      secret_code: "",
    },
  });

  useEffect(() => {
    lookUpGames(setGameNames);
  }, [user, form, router]);

  return (
    <section>
      <div className="m-auto w-full max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmitForm.Player(data, user, teamId, setIsLoading, router),
            )}
            className="space-y-6 p-5 md:p-11"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Game */}
              <FormField
                control={form.control}
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Name</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pick a Game" />
                        </SelectTrigger>

                        <SelectContent>
                          {gameNames.map((game) => (
                            <SelectItem value={game} key={game}>
                              {game}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Game Handle */}
              <FormField
                control={form.control}
                name="game_handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Handle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your in-game username"
                        required
                      />
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
                      <Input
                        {...field}
                        placeholder="Your in-game rank (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        min={1}
                        max={350}
                        placeholder="Your Level in game"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* UID */}
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player UID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your unique game ID"
                        required
                      />
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
                        onBlur={(e) =>
                          handleTeamLookup(e.target.value, setTeamId)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              <CheckCheck />
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
