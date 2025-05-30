"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TournamentCard } from "@/components/ui/dashboard/card/tournament";
import { Skeleton } from "@/components/ui/skeleton";
import { Get } from "@/lib/action/_get";
import { StarredTournament } from "./starred/page";
import { Ghost, LoaderCircle, Search } from "lucide-react";
import { TournamentCardSkeleton } from "@/components/ui/skeleton/tournament-card";

const AllTournaments = () => {
  const [tournaments, setTournaments] = useState<StarredTournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<
    StarredTournament[]
  >([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await Get.Tournaments();

        setTournaments(data);
        setFilteredTournaments(data);
      } catch (err) {
        console.error("Failed to fetch tournaments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const handleSearch = () => {
    const filtered = tournaments.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredTournaments(filtered);
  };

  const handleFilter = () => {
    const upcoming = tournaments.filter(
      (t) => new Date(t.startDate) > new Date(),
    );
    setFilteredTournaments(upcoming);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">All Tournaments</h1>
        <p className="text-gray-500">
          Browse and discover exciting competitions
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full gap-2 sm:max-w-xl">
          <Input
            type="text"
            placeholder="Search tournament by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {/* <Button variant="outline" className="text-primary" onClick={handleFilter}>
          Filter Upcoming
        </Button> */}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(6)].map((_, i) => (
            <TournamentCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredTournaments.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
          <Ghost className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-primary">
            No Tournaments Found
          </h3>
          <p className="max-w-md text-sm text-gray-500">
            We could not find any tournaments matching your filters or search.
            <br />
            Try adjusting the filters or search term.
          </p>
          <div className="mt-4">
            <Button
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
              Reset Search
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTournaments.map((tournament) => (
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
              detailsLink={`/dashboard/tournaments/${tournament.uid}`}
              players={0}
              applyLink={`/dashboard/tournaments/${tournament.uid}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTournaments;
