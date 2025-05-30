"use client";

import React, { useEffect, useState } from "react";
import { isBefore } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TournamentFormValues } from "@/lib/placeholder-data";
import { DatePicker, TimeWithTimezonePicker } from "../../date-and-time-picker";
import { Card, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../form";
import { useScheduleStep } from "@/app/_components/context/schedule";

const MatchSetupIntro2 = ({
  form,
}: {
  form: UseFormReturn<TournamentFormValues>;
}) => {
  const { handleNextStep , handlePreviousStep } = useScheduleStep()
  const today = new Date();
  const [errors, setErrors] = useState<string | null>(null);

  const registrationStart = form.watch("registrationStartDate");
  const registrationEnd = form.watch("registrationEndDate");
  const tournamentStart = form.watch("startDate");
  const tournamentEnd = form.watch("endDate");
  const time = form.watch("time");

  useEffect(() => {
    let errorMessage: string | null = null;

    if (registrationStart && isBefore(registrationStart, today)) {
      errorMessage = "Registration start date cannot be in the past.";
    } else if (
      registrationEnd &&
      tournamentStart &&
      isBefore(tournamentStart, registrationEnd)
    ) {
      errorMessage = "Tournament start date must be after registration ends.";
    }

    setErrors(errorMessage);
  }, [registrationStart, registrationEnd, tournamentStart, today]);

  return (
    <div className="mx-auto mt-10 max-w-4xl p-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Match setup
          </CardTitle>
        </CardHeader>
        <div className="grid gap-5 p-5">
          {/* Registration Start Date */}
          <FormField
            control={form.control}
            name="registrationStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => {
                      if (!date) return;
                      return form.setValue("registrationStartDate", date);
                    }}
                    placeholder="Select start date"
                    disabled={{ before: today }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration End Date */}
          <FormField
            control={form.control}
            name="registrationEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => {
                      if (!date) return;
                      return form.setValue("registrationEndDate", date);
                    }}
                    placeholder="Select end date"
                    disabled={
                      registrationStart
                        ? { before: registrationStart }
                        : { before: today }
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tournament Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => {
                      if (!date) return;
                      return form.setValue("startDate", date);
                    }}
                    placeholder="Select tournament start date"
                    disabled={
                      registrationEnd
                        ? { before: registrationEnd }
                        : { before: today }
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Match Time & Timezone */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Time & Timezone</FormLabel>
                <FormControl>
                  <TimeWithTimezonePicker
                    time={field.value}
                    timezone={form.watch("timezone")}
                    onTimeChange={(val) => form.setValue("time", val)}
                    onTimezoneChange={(tz) => form.setValue("timezone", tz)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tournament End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => {
                      if (!date) return;
                      return form.setValue("endDate", date);
                    }}
                    placeholder="Select end date"
                    disabled={
                      tournamentStart
                        ? { before: tournamentStart }
                        : { before: today }
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Validation Errors */}
          {errors && (
            <p className="mt-2 text-sm font-medium text-red-500">{errors}</p>
          )}
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
          disabled={
            !registrationStart || !registrationEnd || !tournamentStart || !time ||!tournamentEnd
          }
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro2;
