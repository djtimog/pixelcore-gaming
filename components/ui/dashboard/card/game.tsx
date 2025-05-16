"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export type GameType = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  esrb_rating?: {
    name: string;
  };
  platforms: {
    platform: {
      id: number;
      name: string;
    };
    requirements?: {
      minimum?: string;
      recommended?: string;
    };
  }[];
};

type Props = {
  game: GameType;
  onClick: () => void;
  active: boolean;
};

export const GameCard = ({ game, onClick, active }: Props) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card
        className={`overflow-hidden rounded-2xl border shadow-sm ${active ? "border-2 border-primary" : ""}`}
        onClick={onClick}
      >
        {/* Game Image */}
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Info */}
        <CardContent className="space-y-2 pt-3 px-2">
          <h3 className="line-clamp-1 text-lg font-semibold">{game.name}</h3>
          <div className="flex flex-wrap items-center gap-2 truncate text-sm text-muted-foreground">
            <Badge variant="outline">Released: {game.released}</Badge>
            {game.esrb_rating && (
              <Badge variant="secondary">{game.esrb_rating.name}</Badge>
            )}
          </div>

          {/* Platform Requirements Dropdown */}
          {game.platforms.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size={"sm"}
                  className="mt-2 flex items-center gap-1 w-full"
                >
                  <span className="truncate">View Requirements</span>{" "}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-70">
                <div className="space-y-4">
                  {game.platforms.map(({ platform, requirements }) => (
                    <div key={platform.id}>
                      <p className="text-sm font-medium">{platform.name}</p>
                      <div className="ml-2 space-y-1 text-xs text-muted-foreground">
                        {requirements?.minimum && (
                          <p>
                            <span className="font-semibold">Min:</span>{" "}
                            {requirements.minimum}
                          </p>
                        )}
                        {requirements?.recommended && (
                          <p>
                            <span className="font-semibold">Rec:</span>{" "}
                            {requirements.recommended}
                          </p>
                        )}
                        {!requirements?.minimum &&
                          !requirements?.recommended && (
                            <p>No requirements listed.</p>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button size="sm" variant="secondary">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
