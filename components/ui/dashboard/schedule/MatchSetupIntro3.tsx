"use client";

import React, { useState } from "react";
import { Label } from "../../label";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Card, CardHeader, CardTitle } from "../../card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../button";

const MatchSetupIntro3 = ({
    nextStep,
    previousStep,
  }: {
    nextStep: () => void;
    previousStep: () => void;
  }) => {
  const [formData, setFormData] = useState({
    maxPlayers: "",
    maxTeams: "",
    prizePool: "",
    rules: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div className="mx-auto mt-10 max-w-4xl p-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Match setup
          </CardTitle>
        </CardHeader>
        <div className="grid gap-6 p-5">
          <div className="space-y-2">
            <Label htmlFor="maxPlayers">Max Players Per Team</Label>
            <Input
              id="maxPlayers"
              type="number"
              min={5}
              value={formData.maxPlayers}
              onChange={handleChange}
              placeholder="Enter max players per team"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTeams">Max Teams</Label>
            <Input
              id="maxTeams"
              type="number"
              min={1}
              value={formData.maxTeams}
              onChange={handleChange}
              placeholder="Enter maximum number of teams"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prizePool">Prize Pool</Label>
            <Input
              id="prizePool"
              type="text"
              value={formData.prizePool}
              onChange={(e) => {
                // Optional: Format input to always start with $
                const inputValue = e.target.value.replace(/[^0-9.]/g, "");
                const formatted = inputValue ? `$${inputValue}` : "";
                handleChange({
                  ...e,
                  target: { ...e.target, value: formatted, id: "prizePool" },
                });
              }}
              placeholder="$1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules">Tournament Rules</Label>
            <Textarea
              id="rules"
              value={formData.rules}
              onChange={handleChange}
              placeholder="Enter rules separated by commas (e.g., No cheating, Must check-in 30 mins early, Team leader must report score)"
              rows={4}
            />
          </div>
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
          disabled={formData.maxPlayers === "" || formData.prizePool === "" || formData.maxTeams === ""}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro3;
