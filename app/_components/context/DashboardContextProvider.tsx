"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { Get } from "@/lib/action/_get";
import LogoAnimation from "@/components/ui/loading-logo";
import { toast } from "@/hooks/use-toast";
import { Team } from "@/lib/placeholder-data";

export type UserProfile = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string | null;
  createdAt: Date | null;
  imageUrl: string | null;
  isSubscribed: boolean | null;
  isVerified: boolean | null;
  phoneNumber: string | null;
  discordHandle: string | null;
  referredBy: number | null;
};

export type PlayerProfile = {
  id: number;
  gameId: number;
  uid: string;
  userId: number;
  teamId: number | null;
  gameHandle: string | null;
  rank: string | null;
  level: number | null;
};

type DbUserContextType = {
  user: UserProfile;
  player: PlayerProfile;
};

type TeamContextType = {
  dbTeam: Team | null;
  setDbTeam: Dispatch<SetStateAction<Team | null>>;
};

const DbUserContext = createContext<DbUserContextType | null>(null);
const TeamContext = createContext<TeamContextType | null>(null);

export function DashboardContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();
  const pathname = usePathname();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(
    null,
  );
  const [dbTeam, setDbTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      try {
        const userResult = await Get.UserByEmail(email);
        if (!userResult) {
          router.push("/user-sign-up");
          return;
        }

        const playerResult = await Get.PlayerByUserId(userResult.id);
        if (!playerResult) {
          router.push("/player-sign-up");
          return;
        }

        setUserProfile(userResult);
        setPlayerProfile(playerResult);

        if (playerResult.teamId) {
          const teamResult = await Get.TeamById(playerResult.teamId);

          if (!teamResult) {
            toast({
              title: "Team Unavailable",
              description: "We are unable to find the team with this ID.",
              variant: "destructive",
            });
            router.push("/dashboard");
          } else {
            setDbTeam(teamResult);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Context fetch error:", error);
        toast({
          title: "Error loading user/team data",
          description: "Please try again later.",
          variant: "destructive",
        });
        router.push("/");
      }
    };

    fetchData();
  }, [email, router, pathname]);

  if (loading || !userProfile || !playerProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  return (
    <DbUserContext.Provider
      value={{ user: userProfile, player: playerProfile }}
    >
      <TeamContext.Provider value={{ dbTeam, setDbTeam }}>
        {children}
      </TeamContext.Provider>
    </DbUserContext.Provider>
  );
}

export const useDbUser = () => {
  const context = useContext(DbUserContext);
  if (!context)
    throw new Error("useDbUser must be used within AppContextProvider");
  return context;
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context)
    throw new Error("useTeam must be used within AppContextProvider");
  return context;
};
