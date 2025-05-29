"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DollarSign,
  Gamepad2,
  Info,
  Share,
  Star,
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
import { useState } from "react";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { useDbUser } from "@/app/_components/context/userDetails";

export const TournamentCard = ({
  id,
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
  const { dbPlayer } = useDbUser();
  const [isStarred, setIsStarred] = useState<boolean>(false);

  return (
    <div>
      <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full object-cover"
        />

        <div
          className={`absolute right-0 top-0 m-1 mr-2 cursor-pointer text-sm ${isStarred ? "text-primary" : "dark:text-black"}`}
          onClick={() => {
            onSubmitForm.StarTourament(
              isStarred,
              setIsStarred,
              id,
              dbPlayer.id,
            );
          }}
        >
          <span className="text-3xl">{isStarred ? "★" : "☆"}</span>
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-md truncate font-bold text-primary">{title}</h3>
          <span className="flex text-xs text-primary">
            {prize.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-2 truncate text-sm">
            <Gamepad2 size={16} className="text-primary" />
            <span className="truncate">{game}</span>
          </p>
          <span className="flex text-xs text-primary">
            <UsersRound size={16} strokeWidth={1} className="mx-1" /> {players}
          </span>
        </div>

        <p className="flex gap-3 truncate text-sm text-gray-500">
          <span className="font-bold text-primary">{time}</span>
          {date}
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs text-gray-500">Hosted by: {host}</p>

          <Link
            href={detailsLink}
            className="flex items-center gap-2 text-xs text-primary"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size="16" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
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

      <div className="flex gap-2">
        <Link href={applyLink} className="shrink grow">
          <Button className="w-full rounded-lg">Apply Now</Button>
        </Link>

        {/* to do more link shaaring here */}

        <Button
          size="icon"
          variant="ghost"
          onClick={async () => {
            const shareData = {
              title: "PixelCore Esport",
              text: "🎮 Join PixelCore Esport – host your own tournaments, compete in epic battles, and climb the leaderboards! Let’s play and win together! 🏆🔥",
              url: "https://pixelcoreesport.com/referral-link", // Add code or tracking if needed
            };

            if (navigator.share) {
              try {
                await navigator.share(shareData);
              } catch (err) {
                console.error("Error sharing:", err);
              }
            } else {
              alert("Sharing is not supported on this browser");
            }
          }}
        >
          {" "}
          <Share />
        </Button>
      </div>
    </div>
  );
};
