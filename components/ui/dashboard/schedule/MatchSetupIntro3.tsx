"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { TournamentFormValues } from "@/lib/placeholder-data";
import { useScheduleStep } from "@/app/_components/context/schedule";

import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Card, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

const MatchSetupIntro3 = ({
  form,
}: {
  form: UseFormReturn<TournamentFormValues>;
}) => {
  const { handleNextStep, handlePreviousStep } = useScheduleStep();

  const maxPlayers = form.watch("maxPlayersPerTeam");
  const maxTeams = form.watch("maxTeams");
  const prizePool = form.watch("prizePool");

  return (
    <div className="mx-auto mt-10 max-w-4xl p-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Match setup
          </CardTitle>
        </CardHeader>
        <div className="grid gap-6 p-5">
          {/* Max Players */}
          <FormField
            control={form.control}
            name="maxPlayersPerTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Players Per Team</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value.toString() : "1"}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick Team Players" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={"1"}>Solo</SelectItem>
                      <SelectItem value={"2"}>Duo (2 Players)</SelectItem>
                      <SelectItem value={"3"}>Trio (3 Players)</SelectItem>
                      <SelectItem value={"4"}>Squad (4 Players)</SelectItem>
                      <SelectItem value={"5"}>5 Players</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Teams */}
          <FormField
            control={form.control}
            name="maxTeams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Teams</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={2}
                    placeholder="Enter maximum number of teams"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prize Pool */}
          <FormField
            control={form.control}
            name="prizePool"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize Pool</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="$1000"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9.]/g, "");
                      const formatted = inputValue ? `$${inputValue}` : "";
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tournament Rules */}
          <FormField
            control={form.control}
            name="rules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Rules</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Enter rules separated by commas (e.g., No cheating, Must check-in 30 mins early, Team leader must report score)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={handlePreviousStep}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={handleNextStep}
          disabled={!maxPlayers || !maxTeams || !prizePool}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro3;
