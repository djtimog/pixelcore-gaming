"use client";

import { Get } from "@/lib/action/_get";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type DbUserData = {
  name: string;
  username: string;
  email: string;
  phoneNumber?: string;
  discordHandle?: string;
  role?: string;
  imageUrl?: string;
  isSubscribed?: boolean;
  id: number;
  createdAt?: Date;
  isVerified?: boolean;
};

type DbPlayerData = {
  id: number;
  gameId: number;
  uid: string;
  userId: number;
  teamId?: number;
  gameHandle?: string;
  rank?: string;
  level?: number;
  isCaptain?: boolean;
};

interface DbUserDetailsContext {
  dbUser: DbUserData | null;
  dbPlayer: DbPlayerData | null;
}

const DbUserDetailsContext = createContext<DbUserDetailsContext | null>(null);

export const DbUserDetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [userDetails, setUserDetails] = useState<DbUserData | null>(null);
  const [playerDetails, setPlayerDetails] = useState<DbPlayerData | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!email) return;
      const dbUser = await Get.UserByEmail(email);

      if (!dbUser) {
        router.push("/user-sign-up");
        return;
      }
      setUserDetails(dbUser);
    };

    fetchUserDetails();
  }, [email, router]);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (!userDetails?.id) return;
      const dbPlayer = await Get.PlayerByUserId(userDetails.id);

      if (!dbPlayer) {
        router.push("/player-sign-up");
        console.error("Player details not found");
        return;
      }

      setPlayerDetails(dbPlayer);
    };

    fetchPlayerDetails();
  }, [userDetails, router]);

  return (
    <DbUserDetailsContext.Provider value={{ dbUser: userDetails, dbPlayer: playerDetails }}>
      {children}
    </DbUserDetailsContext.Provider>
  );
};

export const useDbUser = () => {
  const details = useContext(DbUserDetailsContext);
  if (!details || !details.dbUser || !details.dbPlayer) {
    throw new Error("useDbUser must be used within DbUserDetailsProvider.");
  }

  return details;
};
