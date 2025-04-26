"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { UserAvatar } from "./avatar";

const ProfileImage = () => {
  const { user } = useUser();

  return (
    <Link href="/profile">
      <UserAvatar url={user?.imageUrl} alt={`${user?.username}`} name={`${user?.username}`} />
    </Link>
  );
};

export default ProfileImage;
