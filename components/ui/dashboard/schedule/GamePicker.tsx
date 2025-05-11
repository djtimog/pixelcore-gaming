"use client";

import { Get } from "@/lib/action/_get";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameCard } from "../card/game";
import { ChevronRight, Search } from "lucide-react";
import { Button } from "../../button";

type Game = {
  id: number;
  name: string;
  genre: string | null;
  platform: string | null;
  publisher: string | null;
  image: string;
};

const GamePicker = ({ nextStep }: { nextStep: () => void }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const getGames = await Get.Games();

      getGames.forEach((game) => {
        const platforms = game.platform?.split(", ");
        const images = JSON.parse(game.images);

        if (game.genre !== null) {
          const genre = game.genre;
        }

        platforms?.forEach((platform) => {
          const gameOnly = { ...game, platform, image: images[platform] };
          setGames((prev) => [...prev, gameOnly]);
        });
      });
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2 className="outlined-text text-center text-3xl tracking-wide">
        Select a Game
      </h2>
      <div className="space-y-6 px-4 py-6">
        <div className="flex items-center gap-7">
          <div className="flex grow items-center justify-center space-x-3 rounded-md border-2 px-3 py-1">
            <Search className="text-xs" />
            <Input
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <Button
            size={"lg"}
            className="flex items-center gap-2 rounded-md "
            onClick={nextStep}
            disabled={!selectedGame}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[700px] pr-2">
          <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filteredGames.map((game) => (
              <GameCard
                key={`${game.id}-${game.name}-${game.platform}`}
                game={game}
                onClick={() => {
                  setSelectedGame(game);
                }}
                active={
                  selectedGame?.id === game.id &&
                  selectedGame?.platform === game.platform
                }
              />
            ))}
          </div>
          {filteredGames.length === 0 && (
            <p className="mt-6 text-center text-muted-foreground">
              No games found.
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default GamePicker;
