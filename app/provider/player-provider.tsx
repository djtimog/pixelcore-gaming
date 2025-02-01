"use client";

import React, { useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "@/config/db";
import { usersTable, playersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  const checkPlayerStatus = useCallback(async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      router.push("/sign-up");
      return;
    }

    // Find the user by email
    const userResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userResult[0]) {
      router.push("/user/signUp");
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
      .where(eq(playersTable.userId, userData.id));

    if (!playerResult[0]) {
      router.push("/schedule/player-sign-up");
      return;
    }
  }, [user, router]); // Add dependencies

  useEffect(() => {
    if (user) {
      checkPlayerStatus();
    } else {
      router.push("/sign-up");
    }
  }, [user, checkPlayerStatus, router]); // Include dependencies

  return <main>{children}</main>;
}
