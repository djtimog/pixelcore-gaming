"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Game = {
  id: number;
  name: string;
  genre: string | null;
  platform: string | null;
  publisher: string | null;
  image: string;
};

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  active?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick,active }) => {


  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition hover:shadow-xl hover:scale-[1.02] rounded-xl overflow-hidden border-muted ${active ? "border-2 border-primary" : "border"}`}
    >
      <CardHeader className="p-0">
        <Image
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-cover"
          width={200}
          height={200}
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate">{game.name}</CardTitle>

        <div className="flex flex-wrap gap-2">
          {game.genre && <Badge variant="secondary">{game.genre}</Badge>}
          {game.platform && <Badge variant="outline">{game.platform}</Badge>}
        </div>

        {game.publisher && (
          <p className="text-xs text-muted-foreground italic mt-2">
            Published by {game.publisher}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
