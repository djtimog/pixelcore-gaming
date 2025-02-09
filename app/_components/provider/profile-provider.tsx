"use client";

import ProfileSkeleton from "@/components/ui/skeleton/profile-form-skeleton";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
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
          setPageLoading(false);
          return;
        } else {
          router.push("/user-sign-up");
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

    if (user) {
      fetchUserDetails();
    }
  }, [user, router]);

  return (
    <main className="container mx-auto px-8 py-8 space-y-10">
      <p className="uppercase outlined-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
        User Profile
      </p>
      {!pageLoading ? children : <ProfileSkeleton />}
    </main>
  );
};

export default ProfileProvider;
