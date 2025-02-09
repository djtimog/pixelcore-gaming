"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserFormSkeleton from "@/components/ui/skeleton/user-form-skeleton";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/get";
import { getRolePath } from "@/lib/getRole";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
        const existingUser = await Get.UserByEmail(userEmail);

        if (existingUser.length > 0) {
          const userRole = existingUser[0].role;
          router.push(getRolePath(userRole));
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
