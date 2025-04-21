"use client";
import {
  Check,
  Copy,
  Link2,
  LinkIcon,
  LoaderCircle,
  Share,
  TicketSlash,
  type LucideIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RefersCard = ({
  name,
  description,
  Icon,
  ActionIcon,
  onClick,
}: {
  name: string;
  description: string;
  Icon: LucideIcon;
  ActionIcon: LucideIcon;
  onClick: () => void;
}) => {
  return (
    <div
      className="relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-300 bg-opacity-20 p-5 dark:bg-slate-600"
      onClick={onClick}
    >
      <Icon className="absolute bottom-0 left-0 -ml-7 size-32 -rotate-45 font-extrabold text-primary opacity-70" />
      <ActionIcon className="absolute right-0 top-0 m-2" />
      <div className="relative z-10 h-full w-full">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

type ReferItemProps = {
  name: string;
  description: string;
  Icon: LucideIcon;
  ActionIcon: LucideIcon;
  action: () => Promise<void>;
};

const RefersItem = ({
  name,
  description,
  Icon,
  ActionIcon,
  action,
}: ReferItemProps) => {
  const [iconState, setIconState] = useState<"default" | "loading" | "done">(
    "default"
  );

  const handleClick = async () => {
    setIconState("loading");
    await action();
    setIconState("done");
    setTimeout(() => setIconState("default"), 2000);
  };

  const getCurrentIcon = () => {
    if (iconState === "loading") return LoaderCircle;
    if (iconState === "done") return Check;
    return ActionIcon;
  };

  return (
    <RefersCard
      name={name}
      description={description}
      Icon={Icon}
      ActionIcon={getCurrentIcon()}
      onClick={handleClick}
    />
  );
};

const refersData: ReferItemProps[] = [
  {
    name: "Copy Referral Link",
    description: "Copy Link and Invite Friends",
    Icon: LinkIcon,
    ActionIcon: Copy,
    action: async () => {
      try {
        await navigator.clipboard.writeText("https://pixelcoreesport.com/referral-link"); // Replace with real link
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
  },
  {
    name: "Copy Referral Code",
    description: "Copy Code and Invite Friends",
    Icon: TicketSlash,
    ActionIcon: Copy,
    action: async () => {
      try {
        await navigator.clipboard.writeText("PIXELCORE123"); // Replace with real code
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
  },
  {
    name: "Share",
    description: "Share Link Across your Apps",
    Icon: Link2,
    ActionIcon: Share,
    action: async () => {
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
    },
  },
];

export default function Refers() {
  return (
    <Card className="min-h-screen border-0 bg-inherit">
      <CardHeader>
        <CardTitle className="outlined-text truncate text-center text-2xl tracking-wide">
          Invite Your Friends
        </CardTitle>
        <CardDescription className="flex flex-col sm:flex-row items-center justify-evenly gap-6 pt-8">
          {refersData.map((data) => (
            <RefersItem key={data.name} {...data} />
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
    </Card>
  );
}
