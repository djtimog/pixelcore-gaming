"use client";

import React, { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameCard, GameType } from "../card/game";
import { ChevronRight, Search, Frown } from "lucide-react";
import { Button } from "../../button";
import { UseFormReturn } from "react-hook-form";
import { TournamentFormValues } from "@/lib/placeholder-data";
import { Card, CardHeader, CardTitle } from "../../card";
import { useScheduleStep } from "@/app/_components/context/schedule";

const PLATFORMS = ["All", "PC", "Mobile", "PlayStation", "Xbox", "Nintendo"];
const GAMES_PER_PAGE = 15;

const GamePicker = ({
  form,
}: {
  form: UseFormReturn<TournamentFormValues>;
}) => {
  const { handleNextStep } = useScheduleStep();
  const [games, setGames] = useState<GameType[]>([]);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const selectedGameId = form.watch("gameId");

  useEffect(() => {
    const fetchGames = async () => {
      const getGames: GameType[] = await Get.Games();
      setGames(getGames);
    };

    fetchGames();
  }, []);

  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
    .filter((game) =>
      platformFilter === "All"
        ? true
        : game.platforms?.some((p) =>
            p.platform.name
              .toLowerCase()
              .includes(platformFilter.toLowerCase()),
          ),
    );

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE,
  );

  const handlePlatformChange = (platform: string) => {
    setPlatformFilter(platform);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Card className="border-primary p-2">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Select a Game
          </CardTitle>
        </CardHeader>

        <div className="space-y-6 px-4 pb-7">
          {/* Search & Next Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex grow items-center space-x-3 rounded-md border-2 px-3 py-1">
              <Search className="text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-none focus-visible:outline-none focus-visible:ring-0"
              />
            </div>

            <Button
              size="lg"
              className="mt-2 flex items-center gap-2 sm:mt-0"
              onClick={handleNextStep}
              disabled={!selectedGameId}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Platform Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PLATFORMS.map((platform) => (
              <Button
                key={platform}
                size="sm"
                variant={platformFilter === platform ? "default" : "outline"}
                onClick={() => handlePlatformChange(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>

          {/* Game Cards */}
          <ScrollArea className="h-screen px-5 py-2">
            {paginatedGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {paginatedGames.map((game, index) => (
                  <GameCard
                    key={index}
                    game={game}
                    onClick={() => form.setValue("gameId", game.id)}
                    active={selectedGameId === game.id}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 flex flex-col items-center text-center text-muted-foreground">
                <Frown className="mb-4 h-10 w-10" />
                <p className="text-lg font-medium">No games found 😕</p>
                <p className="text-sm">Try a different search or filter.</p>
              </div>
            )}
          </ScrollArea>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    size="icon"
                    variant={page === currentPage ? "default" : "ghost"}
                    onClick={() => setCurrentPage(page)}
                    className="w-9"
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GamePicker;
