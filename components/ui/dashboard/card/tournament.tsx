"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Gamepad2,
  Info,
  LoaderCircle,
  Share,
  UsersRound,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TournamentCardProps } from "@/lib/placeholder-data";
import { useState, useEffect } from "react";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { useDbUser } from "@/app/_components/context/DbUserProvider";
import { Get } from "@/lib/action/_get";
import { handleShare } from "@/lib/share";

export const TournamentCard = ({
  id,
  uid,
  imageUrl,
  title,
  prize,
  game,
  players,
  time,
  date,
  host,
  rules,
  detailsLink,
  applyLink,
}: TournamentCardProps) => {
  const { player } = useDbUser();

  const [isStarred, setIsStarred] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(true);

  useEffect(() => {
    const fetchStarredStatus = async () => {
      try {
        const starredTournaments = await Get.StarredTournamentByPlayerId(
          player.id,
        );
        const isThisStarred = starredTournaments.some(
          (tournament) => tournament.tournamentId === id,
        );
        setIsStarred(isThisStarred);
      } catch (error) {
        console.error("Error fetching starred tournaments:", error);
      } finally {
        setLoadingStarred(false);
      }
    };

    fetchStarredStatus();
  }, [id, player.id]);

  const shareData = {
    title: `${title} - PixelCore Esport`,
    text: `🎮 Compete in ${title} playing ${game}! 🏆 Prize pool: $${prize.toLocaleString()}.\nJoin now and show your skills! 🔥`,
    url: `https://pixelcore-gaming.vercel.app/tournaments/${uid}`,
  };
  return (
    <div>
      {/* Image + Star */}
      <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full object-cover"
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
                  id,
                  player.id,
                )
              }
            >
              {isStarred ? "★" : "☆"}
            </span>
          )}
        </div>
      </div>

      {/* Tournament Info */}
      <div className="mb-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-md truncate font-bold text-primary">{title}</h3>
          <span className="text-xs text-primary">
            {prize.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-sm">
          <p className="flex items-center gap-1 truncate">
            <Gamepad2 size={16} className="text-primary" />
            <span className="truncate">{game}</span>
          </p>
          <span className="flex items-center text-xs text-primary">
            <UsersRound size={16} strokeWidth={1} className="mx-1" /> {players}
          </span>
        </div>

        <p className="flex gap-3 truncate text-sm text-gray-500">
          <span className="font-bold text-primary">{time}</span> {date}
        </p>

        {/* Host + Rules Tooltip */}
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs text-gray-500">Hosted by: {host}</p>
          <Link
            href={detailsLink}
            className="flex items-center gap-1 text-xs text-primary"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs text-xs">
                    <h6 className="font-semibold">Rules</h6>
                    <ol className="list-inside list-decimal space-y-1">
                      {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ol>
                    <p className="mt-1 underline">Click to Learn More</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            Details
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={applyLink} className="flex-1">
          <Button className="w-full rounded-lg">Apply Now</Button>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleShare(shareData)}
        >
          <Share />
        </Button>
      </div>
    </div>
  );
};
