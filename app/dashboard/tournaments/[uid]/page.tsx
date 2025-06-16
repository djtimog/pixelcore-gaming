"use client";

import { useEffect, useState } from "react";
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
  MessageSquare,
  LoaderCircle,
  LucideIcon,
  Move3dIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { useDbUser } from "@/app/_components/context/DbUserProvider";
import {
  MatchWithTeams,
  RegistrationEntry,
  RoomInfo,
} from "@/lib/placeholder-data";
import { HostCard } from "@/components/ui/dashboard/card/host";
import {
  AccordionGameCard,
  GameType,
} from "@/components/ui/dashboard/card/game";
import { Update } from "@/lib/action/_post";
import LogoAnimation from "@/components/ui/loading-logo";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import Link from "next/link";
import FeedbackSummary from "@/components/ui/dashboard/tournament/feedback";
import { useUidData } from "@/app/_components/context/UidTournamentProvider";
import AnnouncementSummary from "@/components/ui/dashboard/tournament/announcement";

export default function TournamentDetailsPage() {
  const { uid } = useParams();
  const router = useRouter();
  const { player, user } = useDbUser();
  const { tournament, host } = useUidData();
  const [game, setGame] = useState<GameType | null>(null);

  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);
  const [matches, setMatches] = useState<MatchWithTeams[]>([]);
  const [room, setRoom] = useState<RoomInfo | null>(null);

  const [isStarred, setIsStarred] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetchAll = async () => {
      try {
        const allGames = await Get.Games();
        const foundGame = allGames.find((g) => g.id === tournament.gameId);
        if (!foundGame) {
          toast({
            title: "Game Not Found",
            description:
              "The game associated with this tournament does not exist.",
            variant: "destructive",
          });
          router.push("/dashboard/tournaments");
          return;
        }

        // 4. Team registrations
        const regs = await Get.TeamRegistrationsByTournamentId(tournament.id);
        // 5. Announcements
        // const ann = await Get.AnnouncementsByTournamentId(tournament.id);
        // 6. Matches + teams
        const ms = await Get.MatchesByTournamentId(tournament.id);
        // 8. Room link
        const rm = await Get.RoomByTournamentId(tournament.id);

        setGame(foundGame);
        setRegistrations(regs);
        setMatches(ms);
        setRoom(rm);
      } catch (err) {
        console.error("Error fetching tournament details:", err);
        toast({
          title: "Error",
          description: "Something went wrong while loading tournament data.",
          variant: "destructive",
        });
        router.push("/dashboard/tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [uid, router]);

  useEffect(() => {
    const fetchStarredStatus = async () => {
      try {
        const starredTournaments = await Get.StarredTournamentByPlayerId(
          player.id,
        );
        const isThisStarred = starredTournaments.some(
          (starredTournament) =>
            starredTournament.tournamentId === tournament?.id,
        );
        setIsStarred(isThisStarred);
      } catch (error) {
        console.error("Error fetching starred tournaments:", error);
      } finally {
        setLoadingStarred(false);
      }
    };

    fetchStarredStatus();
  }, [tournament, player.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  if (!tournament) return null;

  const isOrganizer = tournament.organizerId === user.id;
  const now = new Date();
  const regEnd = new Date(tournament.registrationEndDate);
  const regStart = new Date(tournament.registrationStartDate);

  // 1. Registration logic: close if date passed OR maxTeams reached
  const registrationClosedByDate = now > regEnd;
  if (registrationClosedByDate && tournament.registrationStatus === "open") {
    try {
      const updateTournament = async () => {
        await Update.TournamentRegistrationStatus(tournament.id, {
          registrationStatus: "closed",
        });
      };

      updateTournament();
    } catch (error) {
      console.error("Error fetching tournament details:", error);

      toast({
        title: "Tournament Update failed",
        description: "Try Again Later",
      });
      router.push("/dashboard/tournaments");
    }
  }
  const acceptedCount = registrations.filter((r) => r.isAccepted).length;
  const registrationClosedByCapacity = acceptedCount >= tournament.maxTeams;
  const registrationOpen =
    now >= regStart &&
    !registrationClosedByDate &&
    !registrationClosedByCapacity;

  if (registrationOpen && tournament.registrationStatus === "upcoming") {
    try {
      const updateTournament = async () => {
        await Update.TournamentRegistrationStatus(tournament.id, {
          registrationStatus: "open",
        });
      };

      updateTournament();
    } catch (error) {
      console.error("Error fetching tournament details:", error);

      toast({
        title: "Tournament Update failed",
        description: "Try Again Later",
      });
      router.push("/dashboard/tournaments");
    }
  }

  const progressPct = Math.min(
    (acceptedCount / tournament.maxTeams) * 100,
    100,
  );

  return (
    <motion.div
      className="container mx-auto px-4 py-10 md:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ─── MAIN CARD ─────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <div className="relative m-4 overflow-hidden rounded-lg bg-gray-300">
          <Image
            src={tournament.imageUrl || "/fallback-tournament.jpg"}
            alt={tournament.name}
            width={1200}
            height={600}
            className="h-64 w-full object-cover"
          />

          <div className="absolute right-0 top-0 m-1 mr-2 cursor-pointer text-sm">
            {loadingStarred ? (
              <LoaderCircle className="animate-spin text-muted" />
            ) : (
              <span
                className={`text-3xl ${isStarred ? "text-primary" : "text-gray-400"}`}
                onClick={() =>
                  onSubmitForm.StarTourament(
                    isStarred,
                    setIsStarred,
                    tournament.id,
                    player.id,
                  )
                }
              >
                {isStarred ? "★" : "☆"}
              </span>
            )}
          </div>

          <div className="absolute left-4 top-4 flex gap-2">
            <Badge className="bg-primary text-xs">{tournament.status}</Badge>
            {now > regEnd && (
              <Badge variant="destructive" className="animate-pulse text-xs">
                Registration Closed
              </Badge>
            )}
            {!registrationClosedByDate && registrationClosedByCapacity && (
              <Badge variant="destructive" className="animate-pulse text-xs">
                Full (Max Teams Reached)
              </Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <CardTitle className="mb-2 text-3xl font-bold text-primary">
            {tournament.name.toUpperCase()}
          </CardTitle>
          <p className="mb-7 text-muted-foreground">
            {tournament.description || "No description provided."}
          </p>

          {/* ─── HOST CARD ─────────────────────────────────────────────────────── */}
          {host && (
            <div className="py-4">
              <HostCard host={host} />
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ─── GAME ACCORDION ─────────────────────────────────────────────── */}
          <div className="my-5">
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Gamepad2 size={20} /> <span>Game Registered:</span>
            </div>
            {game && <AccordionGameCard game={game} />}
          </div>

          {/* ─── QUICK STATS GRID ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Prize / Dates */}
            <div className="space-y-3">
              <InfoItem
                Icon={Trophy}
                label="Prize Pool"
                value={tournament.prizePool || "$0"}
              />
              <InfoItem
                Icon={CalendarDays}
                label="Start Date"
                value={new Date(tournament.startDate).toLocaleDateString()}
              />
              <InfoItem
                Icon={CalendarDays}
                label="End Date"
                value={new Date(tournament.endDate).toLocaleDateString()}
              />
              <InfoItem
                Icon={Clock}
                label="Match Time"
                value={`${tournament.time} ${tournament.timezone}`}
              />
            </div>

            {/* Registration & Capacity */}
            <div className="space-y-3">
              <InfoItem
                Icon={CalendarDays}
                label="Registration Window"
                value={`${new Date(
                  tournament.registrationStartDate,
                ).toLocaleDateString()} → ${new Date(
                  tournament.registrationEndDate,
                ).toLocaleDateString()}`}
              />

              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Teams Registered
                  </p>
                  <p className="font-medium">
                    {acceptedCount} / {tournament.maxTeams}
                  </p>
                  <Progress
                    value={progressPct}
                    className="h-2 w-full rounded-full"
                  />
                </div>
              </div>

              <InfoItem
                Icon={Users}
                label="Players per Team"
                value={tournament.maxPlayersPerTeam}
              />
            </div>

            <FeedbackSummary tournamentData={tournament} />
          </div>

          {/* ─── RULES ────────────────────────────────────────────────────────── */}
          <div>
            <h4 className="mb-2 text-lg font-semibold">Tournament Rules</h4>
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="list-inside list-disc space-y-1 text-muted-foreground"
            >
              <ul>
                {tournament.rules
                  ?.split(",")
                  .map((rule, i) => (
                    <li key={i}>
                      {rule.trim().charAt(0).toUpperCase() +
                        rule.trim().slice(1).toLowerCase()}
                    </li>
                  )) || <li>No rules specified.</li>}
              </ul>
            </motion.ul>
          </div>

          <div>
            <AnnouncementSummary
              isOrganizer={isOrganizer}
              tournamentId={tournament.id}
            />
          </div>

          {/* ─── UPCOMING MATCHES ─────────────────────────────────────────────── */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-lg font-semibold">
                <Move3dIcon size={18} /> Upcoming Matches
              </h4>
              {isOrganizer && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/tournaments/${uid}`)}
                >
                  Schedule Match
                </Button>
              )}
            </div>

            {matches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="py-2">Date</th>
                      <th>Time</th>
                      <th>Round</th>
                      <th>Teams</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches
                      .filter((m) => new Date(m.matchDate) >= now)
                      .sort(
                        (a, b) =>
                          new Date(a.matchDate).getTime() -
                          new Date(b.matchDate).getTime(),
                      )
                      .map((m) => (
                        <tr key={m.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">
                            {new Date(m.matchDate).toLocaleDateString()}
                          </td>
                          <td>{m.matchTime.slice(0, 5)}</td>
                          {/* <td>{m.round}</td> */}
                          {/* <td>
                            {m.teams.map((t) => t.teamName).join(" vs. ")}
                          </td> */}
                          <td>{m.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming matches scheduled.
              </p>
            )}
          </div>

          {/* ─── ROOM LINK (IF ANY) ─────────────────────────────────────────────── */}
          {room && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <MessageSquare size={18} /> Tournament Room
              </h4>
              <Link
                href={room.roomLink}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Join Room
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── CALL TO ACTION AREA ─────────────────────────────────────────────── */}
      <motion.div
        className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isOrganizer && (
          <Link href={`/dashboard/schedule?uid=${uid}`}>
            <Button
              variant="default"
              onClick={() => router.push(``)}
              className="w-full md:w-auto"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Tournament
            </Button>
          </Link>
        )}

        {registrationOpen ? (
          <Button
            className="w-full md:w-auto"
            onClick={() => router.push(`/dashboard/tournaments/${uid}/apply`)}
          >
            Apply Now
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full md:w-auto">
            {registrationClosedByDate
              ? "Registration Closed"
              : registrationClosedByCapacity
                ? "Full (No Spots Left)"
                : "Registration Not Yet Open"}
          </Button>
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
