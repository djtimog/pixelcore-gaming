"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
// import PlayerFormSkeleton from "@/components/ui/skeleton/player-form-skeleton";
import { Get } from "@/lib/action/_get";
import { getRolePath } from "@/lib/getRole";

export default function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

        if (existingUser) {
          const userRole = existingUser.role;
          if (userRole === "player") {
            try {
              const existingPlayer = await Get.PlayerByUserId(existingUser.id);

              if (existingPlayer) {
                toast({
                  title: "Alert",
                  description: "You have an account already!",
                });
                router.push("/");
              } else {
                setPageLoading(false);
              }
            } catch (error) {
              console.log(error);
              toast({
                title: "Error",
                description: "An error occurred while fetching player data",
                variant: "destructive",
              });
            }
          } else {
            toast({
              title: "Error",
              description: "User is not a PlAYER",
              variant: "destructive",
            });
            router.push(getRolePath(userRole));
          }
        } else {
          toast({
            title: "Error",
            description: "User is not Found",
            variant: "destructive",
          });
          router.push("/user-sign-up");
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
    } else {
      setPageLoading(true);
    }
  }, [user, router]);
  return (
    <main className="container mx-auto space-y-10 px-4 py-8">
      <p className="outlined-text text-center text-lg uppercase sm:text-xl md:text-2xl lg:text-3xl">
        Team Profile
      </p>
      {pageLoading ? <div>loading...</div> :  children }
    </main>
  );
}
