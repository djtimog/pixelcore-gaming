"use client";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const ProfileImage = () => {
  const { user } = useUser();

  return (
    <Link href="/profile">
      <Avatar className="cursor-pointer w-8 h-8">
        <AvatarImage src={user?.imageUrl} alt={`${user?.username}`} className="object-cover overflow-hidden"/>
        <AvatarFallback>{(user?.username?.charAt(0).toLocaleUpperCase())}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileImage;
