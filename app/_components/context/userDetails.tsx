"use client";
import { Get } from "@/lib/action/_get";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type DbUserData = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  discordHandle: string | null;
  role: string | null;
  imageUrl: string | null;
  isSubscribed: boolean | null;
  id: number;
  createdAt: Date | null;
  isVerified: boolean | null;
};
const DbUserDetails = createContext<DbUserData | null>(null);

export const DbUserDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userDetails, setUserDetails] = useState<DbUserData | null>(null);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();

  const getUserDetails = async () => {
    if (!email) return;
    const dbUser = await Get.UserByEmail(email);

    if (!dbUser) {
      router.push("/user-sign-up");
      return;
    }

    setUserDetails(dbUser);
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);

  return <DbUserDetails.Provider value={userDetails}>{children}</DbUserDetails.Provider>;
};

export const useDbUser = () => {
  const details = useContext(DbUserDetails);
  if (!details) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return details;
};
