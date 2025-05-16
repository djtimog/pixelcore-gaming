"use client";

import { useScheduleStep } from "@/app/dashboard/schedule/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
import { TournamentFormValues } from "@/lib/placeholder-data";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import { GameType } from "../card/game";

const TournamentConfirmation = () => {
  const { handleNextStep, handlePreviousStep } = useScheduleStep();
  const form = useFormContext<TournamentFormValues>();
  const values = form.getValues();

  const [gameName, setGameName] = useState("");

  useEffect(() => {
    const fetchGameName = async () => {
      try {
        const games = await Get.Games();
        const selectedGame = games.find(
          (game: GameType) => game.id === values.gameId,
        );
        setGameName(selectedGame.name);
      } catch (err) {
        console.error("Failed to load game details");
      }
    };

    if (values.gameId) {
      fetchGameName();
    } else {
      setGameName("Unknown Game");
    }
  }, [values.gameId]);

  return (
    <div className="animate-fade-in mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🎉 Review Your Tournament
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Tournament Info</h3>
            <p>
              <strong>Name:</strong> {values.name}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {values.description || "No description provided"}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Game Details</h3>
            <p>
              <strong>Selected Game:</strong> {gameName}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium">Tournament Dates</h3>
              <p>
                <strong>Start:</strong>{" "}
                {format(new Date(values.startDate), "PPP")}
              </p>
              <p>
                <strong>End:</strong> {format(new Date(values.endDate), "PPP")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Registration Dates</h3>
              <p>
                <strong>Open:</strong>{" "}
                {format(new Date(values.registrationStartDate), "PPP")}
              </p>
              <p>
                <strong>Close:</strong>{" "}
                {format(new Date(values.registrationEndDate), "PPP")}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p>
                <strong>Max Teams:</strong> {values.maxTeams}
              </p>
              <p>
                <strong>Players per Team:</strong> {values.maxPlayersPerTeam}
              </p>
              <p>
                <strong>Prize Pool:</strong> {values.prizePool || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Time:</strong> {values.time || "00:00"}
              </p>
              <p>
                <strong>Timezone:</strong> {values.timezone || "UTC"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge>{values.status || "upcoming"}</Badge>
              </p>
            </div>
          </div>

          {values.rules && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium">Rules</h3>
                <ol className="whitespace-pre-line px-4 py-2 text-sm">
                  {values.rules.split(",").map((rule) => (
                    <li key={rule} className="list-inside list-decimal">
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between gap-5 pt-4">
          <Button variant="outline" onClick={handlePreviousStep}>
            ← Go Back and Edit
          </Button>

          <Button onClick={handleNextStep} className="relative w-full sm:w-max">
            Proceed to Payment 💳
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TournamentConfirmation;
