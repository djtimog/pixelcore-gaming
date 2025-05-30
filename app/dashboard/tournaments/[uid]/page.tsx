"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { useDbUser } from "@/app/_components/context/DbUserProvider";
import { Pencil } from "lucide-react";
import { DbTournamentDataType } from "@/lib/placeholder-data";

function TournamentDetailsPage() {
  const { uid } = useParams();
  const router = useRouter();
  const { player } = useDbUser();

  const [tournament, setTournament] = useState<DbTournamentDataType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const fetchTournament = async () => {
      try {
        const data = await Get.TournamentByUid(uid as string);
        if (!data) {
          toast({
            title: "Tournament Not Found",
            description: "The tournament you are looking for does not exist.",
          });
          router.push("/dashboard/tournaments");
          return;
        }
        setTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournament:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [uid]);

  if (loading)
    return (
      <div className="mt-10 text-center">Loading tournament details...</div>
    );
  if (!tournament) return null;

  const isOrganizer = tournament.organizerId === player.id;

  return (
    <div className="container mx-auto py-10">
      <Card className="p-4">
        <div className="overflow-hidden bg-gray-200">
          <Image
            src={tournament.imageUrl}
            alt={tournament.name}
            width={1200}
            height={600}
            className="h-64 w-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {tournament.name}
          </CardTitle>
          <div>
            <p className="text-md">{tournament.description || "No description provided."}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p>
              <strong>Status:</strong> {tournament.status ?? "Upcoming"}
            </p>
            <p>
              <strong>Game ID:</strong> {tournament.gameId}
            </p>
            <p>
              <strong>Prize Pool:</strong> {tournament.prizePool || "$0"}
            </p>
            <p>
              <strong>Start Date:</strong> {tournament.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {tournament.endDate}
            </p>
            <p>
              <strong>Time:</strong> {tournament.time} {tournament.timezone}
            </p>
          </div>
          <div>
            <p>
              <strong>Registration:</strong> {tournament.registrationStartDate}{" "}
              to {tournament.registrationEndDate}
            </p>
            <p>
              <strong>Max Teams:</strong> {tournament.maxTeams}
            </p>
            <p>
              <strong>Max Players per Team:</strong>{" "}
              {tournament.maxPlayersPerTeam}
            </p>
            <p>
              <strong>Organizer ID:</strong> {tournament.organizerId}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {tournament.description || "No description provided."}
            </p>
          </div>
          <div className="col-span-2">
            <h4 className="mb-1 font-semibold">Rules</h4>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {tournament.rules
                ?.split(",")
                .map((rule, index) => <li key={index}>{rule.trim()}</li>) || (
                <li>No rules specified.</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {isOrganizer ? (
        <div className="mt-6 text-right">
          <Button
            onClick={() => router.push(`/dashboard/tournaments/${uid}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Tournament
          </Button>
        </div>
      ) : (
        <Button
          className="mt-6 w-full"
          onClick={() => router.push(`/dashboard/tournaments/${uid}/apply`)}
        >
          Apply Now
        </Button>
      )}
    </div>
  );
}

export default TournamentDetailsPage;
