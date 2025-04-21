"use client";
import { Check, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReferItemProps } from "@/lib/placeholder-data";
import { refersData } from "@/lib/data";
import { RefersCard } from "@/components/ui/dashboard/card/refer";
import { Button } from "@/components/ui/button";

const RefersItem = ({
  name,
  description,
  Icon,
  ActionIcon,
  action,
}: ReferItemProps) => {
  const [iconState, setIconState] = useState<"default" | "loading" | "done">(
    "default",
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

export default function Refers() {
  const referrals = [];
  return (
    <Card className="min-h-screen border-0 bg-inherit">
      <CardHeader>
        <CardTitle className="outlined-text text-center text-3xl tracking-wide">
          Invite Your Friends
        </CardTitle>
        <p className="text-md text-center text-muted-foreground">
          Share your referral link with your friends and earn rewards when they
          sign up.
        </p>
        <CardDescription className="flex flex-col items-stretch justify-evenly gap-6 pt-8 sm:flex-row md:flex-col lg:flex-row">
          {refersData.map((data) => (
            <RefersItem key={data.name} {...data} />
          ))}
        </CardDescription>
      </CardHeader>

      <div className="w-full border border-primary" />

      <CardContent className="p-10">
        <h3 className="outlined-text mb-7 text-xl font-bold tracking-wide">
          Referrals
        </h3>
        {referrals.length === 0 ? (
          <div className="text-center space-y-5">
            <p className="text-md text-muted-foreground">
              You have 0 referrals.
            </p>
              <Button
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
                Click To Invite
              </Button>
          </div>
        ) : (
          <p>1 referrals</p>
        )}
      </CardContent>
    </Card>
  );
}
