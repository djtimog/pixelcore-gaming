"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "@/config/db";
import { usersTable, playersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkPlayerStatus();
    }
  }, [user]);

  const checkPlayerStatus = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      router.push('/sign-up');
      return;
    }

    // Find the user by email
    const userResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userResult[0]) {
      router.push("/user-sign-up");
      return;
    }

    const userData = userResult[0];

    // Check if the user is a player by role
    if (userData.role !== "player") {
      return;
    }

    // Check if the user exists in the players table
    const playerResult = await db
      .select()
      .from(playersTable)
      .where(eq(playersTable.user_id, userData.id));

    if (!playerResult[0]) {
      router.push("/player-sign-up");
      return;
    }

    return;
  };

  return <main>{children}</main>;
}
