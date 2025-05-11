"use client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Label } from "../../label";
import { DatePicker, DateRangePicker } from "../../date-picker";
import { Input } from "../../input";
import { isBefore } from "date-fns";
import { Card, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MatchSetupIntro2 = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const [formData, setFormData] = useState({
    time: "",
    startDate: "",
    endDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
  });

  const [registrationRange, setRegistrationRange] = useState<DateRange>();
  const [tournamentDate, setTournamentDate] = useState<Date>();
  const [tournamentEndDate, setTournamentEndDate] = useState<Date>();
  const [errors, setErrors] = useState<string | null>(null);

  const today = new Date();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    let errorMessage = null;

    if (registrationRange?.from && isBefore(registrationRange.from, today)) {
      errorMessage = "Registration start date cannot be in the past.";
    } else if (
      registrationRange?.from &&
      registrationRange?.to &&
      tournamentDate &&
      isBefore(tournamentDate, registrationRange.to)
    ) {
      errorMessage = "Tournament date cannot be before registration end date.";
    }

    if (registrationRange?.from && registrationRange?.to) {
      setFormData((prev) => ({
        ...prev,
        registrationStartDate: `${registrationRange?.from?.toLocaleDateString()}`,
        registrationEndDate: `${registrationRange?.to?.toLocaleDateString()}`,
      }));
    }

    if (tournamentDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: tournamentDate.toLocaleDateString(),
      }));
    }

    if (tournamentEndDate) {
      setFormData((prev) => ({
        ...prev,
        endDate: tournamentEndDate.toLocaleDateString(),
      }));
    }

    setErrors(errorMessage);
  }, [registrationRange, tournamentDate, tournamentEndDate]);

  return (
    <div className="mx-auto mt-10 max-w-4xl p-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Match setup
          </CardTitle>
        </CardHeader>
        <div className="grid gap-5 p-5">
          <div className="space-y-3">
            <Label>Registration Period</Label>
            <DateRangePicker
              date={registrationRange}
              setDate={setRegistrationRange}
              placeholder="Select registration period"
              disabled={{ before: today }}
            />
          </div>

          <div className="space-y-3">
            <Label>Tournament Start Date</Label>
            <DatePicker
              date={tournamentDate}
              setDate={setTournamentDate}
              placeholder="Select tournament date"
              disabled={
                registrationRange?.to
                  ? { before: registrationRange.to }
                  : { before: today }
              }
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="time">Match Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-md bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label>Tournament End Date</Label>
            <DatePicker
              date={tournamentEndDate}
              setDate={setTournamentEndDate}
              placeholder="Select tournament end-date"
              disabled={
                tournamentDate
                  ? { before: tournamentDate }
                  : { before: today }
              }
            />
          </div>

          {errors && (
            <p className="mt-2 text-sm font-medium text-red-500">{errors}</p>
          )}
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={previousStep}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={nextStep}
          disabled={formData.registrationEndDate === "" || formData.startDate === "" || formData.time === ""}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro2;
