"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserFormSkeleton from "@/components/ui/user-form-skeleton";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { toast } from "@/hooks/use-toast";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  const fetchUserDetails = async () => {
    setPageLoading(true);

    try {
      const userEmail = user?.emailAddresses[0]?.emailAddress;
      if (!userEmail) {
        toast({
          title: "Error",
          description: "An error occurred while fetching user email",
          variant: "destructive",
        });
        throw new Error("User email is undefined");
      }
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, userEmail));
      if (existingUser.length > 0) {
        const userRole = existingUser[0].role;
        userRole === "admin"
          ? router.push("/admin-sign-up")
          : userRole === "admin"
          ? router.push("/team-sign-up")
          : router.push("/player-sign-up");
      } else {
        setPageLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while fetching user data",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, router]);

  return (
    <main className="container mx-auto px-4 py-8 space-y-10">
      <p className="uppercase outlined-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
        Complete Your Profile
      </p>
      {!pageLoading ? children : <UserFormSkeleton />}
    </main>
  );
};

export default UserProvider;
