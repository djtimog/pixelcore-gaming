"use client";

import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Gamepad2,
  Users,
  Pencil,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import {
  useDbUser,
  UserProfile,
} from "@/app/_components/context/DbUserProvider";
import { DbTournamentDataType } from "@/lib/placeholder-data";
import Link from "next/link";
import { HostCard } from "@/components/ui/dashboard/card/host";
import { AccordionGameCard, GameType } from "@/components/ui/dashboard/card/game";

function TournamentDetailsPage() {
  const { uid } = useParams();
  const router = useRouter();
  const { player } = useDbUser();

  const [tournament, setTournament] = useState<DbTournamentDataType | null>(
    null,
  );
  const [host, setHost] = useState<UserProfile>({} as UserProfile);
  const [game, setGame] = useState<GameType>({} as GameType);
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

          try {
            const HostData = await Get.UserById(data.organizerId);
            if (!HostData) {
              throw new Error("Organizer not found");
              toast({
                title: "Organizer Not Found",
              });
            }
            setHost(HostData);
          } catch (error) {
            toast({
              title: "Error Fetching Organizer Data",
            });
            console.error("Error fetching tournament data:", error);
          }
        
        const gameData = await Get.Games();
        const foundGame = gameData.find((g) => g.id === data.gameId);
        if (!foundGame) {
          toast({
            title: "Game Not Found",
            description: "The game associated with this tournament does not exist.",
            variant: "destructive",
          });
          router.push("/dashboard/tournaments");
          return;
        }

        setGame(foundGame);
        setTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournament:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [uid, router]);

  if (loading)
    return (
      <div className="mt-10 text-center">Loading tournament details...</div>
    );
  if (!tournament) return null;

  const isOrganizer = tournament.organizerId === player.id;

  const now = new Date();
  const regEnd = new Date(tournament.registrationEndDate);
  const closingSoon =
    regEnd.getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000;
  const registrationOpened = new Date(tournament.registrationStartDate) <= now;

  return (
    <motion.div
      className="container mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="overflow-hidden rounded-2xl border-none shadow-lg">
        <div className="relative">
          <div className="m-4 overflow-hidden rounded-lg bg-gray-300">
            <Image
              src={"/fallback-tournament.jpg"}
              alt={tournament.name}
              width={1200}
              height={600}
              className="h-64 w-full object-cover"
            />
          </div>
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {tournament.status}
            </Badge>
            {closingSoon && (
              <Badge variant="destructive" className="animate-pulse text-xs">
                Closing Soon
              </Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            {tournament.name}
          </CardTitle>
          <p className="mt-2 text-muted-foreground">
            {tournament.description || "No description provided."}
          </p>

          <div className="mt-5">
            <HostCard host={host} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex gap-3 flex-col">
            <div className="font-bold flex gap-2"><Gamepad2 /> <span>Game Registered:</span></div>
            <AccordionGameCard game={game} />
          </div>
          <div className="grid grid-cols-1 gap-8 text-sm lg:grid-cols-2">
            <div className="space-y-3">
              <InfoItem
                Icon={Trophy}
                label="Prize Pool"
                value={tournament.prizePool || "$0"}
              />
              <InfoItem
                Icon={CalendarDays}
                label="Start Date"
                value={tournament.startDate}
              />
              <InfoItem
                Icon={CalendarDays}
                label="End Date"
                value={tournament.endDate}
              />
              <InfoItem
                Icon={Clock}
                label="Match Time"
                value={`${tournament.time} ${tournament.timezone}`}
              />
            </div>
  
            <div className="space-y-3">
              <InfoItem
                Icon={CalendarDays}
                label="Registration"
                value={`${tournament.registrationStartDate} → ${tournament.registrationEndDate}`}
              />
              <InfoItem
                Icon={Users}
                label="Max Teams"
                value={tournament.maxTeams}
              />
              <InfoItem
                Icon={Users}
                label="Players per Team"
                value={tournament.maxPlayersPerTeam}
              />
            </div>
  
            <div className="col-span-1 lg:col-span-2">
              <h4 className="mb-2 text-lg font-semibold">Tournament Rules</h4>
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="list-inside list-disc space-y-1 text-muted-foreground"
              >
                {tournament.rules
                  ?.split(",")
                  .map((rule, index) => <li key={index}>{rule.trim()}</li>) || (
                  <li>No rules specified.</li>
                )}
              </motion.ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <motion.div
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isOrganizer && (
          <Button
            variant="default"
            onClick={() => router.push(`/dashboard/tournaments/${uid}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Tournament
          </Button>
        )}
        {registrationOpened && (
          <Link href="/dashboard/tournaments/${uid}/apply">
            <Button className="w-full md:w-auto">Apply Now</Button>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}


export function InfoItem({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export default TournamentDetailsPage;
