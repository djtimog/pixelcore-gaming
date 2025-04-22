"use client";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage, UserAvatar } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const ProfileImage = () => {
  const { user } = useUser();

  return (
    <Link href="/profile">
      <UserAvatar url={user?.imageUrl} alt={`${user?.username}`} name={user?.username!} />
    </Link>
  );
};

export default ProfileImage;
