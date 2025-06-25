"use client";

import React, { useEffect, useState } from "react";
import { useDbUser } from "@/app/_components/context/DashboardContextProvider";
import { Get } from "@/lib/action/_get";
import { TournamentCard } from "@/components/ui/dashboard/card/tournament";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DbTournamentDataType } from "@/lib/placeholder-data";

function Starred() {
  const db = useDbUser();
  const [tournaments, setTournaments] = useState<DbTournamentDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const starred = await Get.StarredTournamentByPlayerId(db.player.id);
        const allTournaments = await Get.Tournaments();
        const filtered = allTournaments.filter((t) =>
          starred.some(
            (s: { tournamentId: number }) => s.tournamentId === t.id,
          ),
        );
        setTournaments(filtered);
      } catch (error) {
        console.error("Failed to fetch starred tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarred();
  }, [db.player.id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-primary">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-sm text-gray-500">
        <div className="mb-4 text-5xl">⭐</div>
        <p className="mb-2 text-base text-gray-700 dark:text-gray-400">
          No starred tournaments yet.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Browse tournaments and star your favorites to easily find them here.
        </p>
        <Link href="/dashboard/tournaments">
          <Button className="rounded-full bg-primary text-white transition hover:bg-primary/90">
            Browse Tournaments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="outlined-text text-3xl font-bold tracking-wide">
          Your Starred Tournaments
        </h1>
        <p className="text-sm text-muted-foreground">
          These are tournaments you have marked as favorites.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            uid={tournament.uid}
            id={tournament.id}
            imageUrl={tournament.imageUrl}
            title={tournament.name}
            prize={tournament.prizePool || "$0"}
            game={`${tournament.gameId}`}
            time={`${tournament.time} ${tournament.timezone}`}
            date={tournament.startDate}
            host={`${tournament.organizerId}`}
            rules={
              tournament.rules?.split(",").map((rule) => rule.trim()) || []
            }
            link={`/dashboard/tournaments/${tournament.uid}`}
            players={0}
          />
        ))}
      </div>
    </div>
  );
}

export default Starred;
