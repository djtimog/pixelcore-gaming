"use client";

import React, { useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Get } from "@/lib/action/get";

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  const checkPlayerStatus = useCallback(async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      router.push("/sign-up");
      return;
    }

    // Find the user by email
    const userResult = await Get.UserByEmail(email);

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
    const playerResult = await Get.PlayerByUserId(userData.id);

    if (!playerResult[0]) {
      router.push("/player-sign-up");
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
