"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Get } from "@/lib/action/_get";
import LogoAnimation from "@/components/ui/loading-logo";

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
  isCaptain: boolean | null;
};

interface DbUserContextValue {
  user: UserProfile;
  player: PlayerProfile;
}

const DbUserContext = createContext<DbUserContextValue | null>(null);

export const DbUserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!email) return;

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
      setLoading(false);
    };

    fetchProfiles();
  }, [email, router]);

  if (loading || !userProfile || !playerProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  const contextValue: DbUserContextValue = {
    user: userProfile,
    player: playerProfile,
  };

  return (
    <DbUserContext.Provider value={contextValue}>
      {children}
    </DbUserContext.Provider>
  );
};

export const useDbUser = () => {
  const context = useContext(DbUserContext);
  if (!context) {
    throw new Error("useDbUser must be used within a DbUserProvider");
  }
  return context;
};
