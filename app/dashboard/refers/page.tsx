"use client";
import { Check, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReferItemProps, RefersAccount } from "@/lib/placeholder-data";
import { refersData } from "@/lib/data";
import { RefersCard } from "@/components/ui/dashboard/card/refer";
import { Button } from "@/components/ui/button";
import { RefersTable } from "@/components/ui/dashboard/table/refers";
import { GetReferralCodeById } from "@/lib/codeGenerator";
import { Get } from "@/lib/action/_get";
import LogoAnimation from "@/components/ui/loading-logo";
import { useDbUser } from "@/app/_components/context/DashboardContextProvider";

const RefersItem = ({
  name,
  description,
  Icon,
  ActionIcon,
  action,
}: ReferItemProps) => {
  const db = useDbUser();

  const [iconState, setIconState] = useState<"default" | "loading" | "done">(
    "default",
  );

  const handleClick = async () => {
    setIconState("loading");
    await action(db.user.id);

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
  const db = useDbUser();
  const [isLoading, setIsLoading] = useState(false);
  const [referrals, setReferrals] = useState<RefersAccount[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      setIsLoading(true);
      try {
        const users = await Get.UsersByReferredBy(db.user.id);

        const transformedUsers = users.map((user) => ({
          id: user.id,
          imageUrl: user.imageUrl || "/about/team/ceo.jpeg",
          name: user.name,
          email: user.email,
          createdAt: new Date(user.createdAt || Date.now()),
        }));

        setReferrals(transformedUsers);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, [db.user.id]);

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
        {isLoading ? (
          <LogoAnimation />
        ) : referrals.length === 0 ? (
          <div className="space-y-5 text-center">
            <p className="text-md text-muted-foreground">
              You have 0 referrals.
            </p>
            <Button
              onClick={async () => {
                const link = window.location.href;
                const referralLink = `${link}?referral=${encodeURIComponent(
                  GetReferralCodeById(db.user.id),
                )}`;
                const shareData = {
                  title: "⚔️ Join the Ultimate Gaming Arena - PixelCore Esport",
                  text: "🔥 Level up your competitive gaming! Join PixelCore Esport through my referral link and unlock: ⚡ Tournament hosting ⚡ Skill-based matchmaking ⚡ Prize competitions ⚡ Leaderboard glory. Ready to prove you're the best? 🏆",
                  url: referralLink,
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
          <div>
            <RefersTable data={referrals} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
