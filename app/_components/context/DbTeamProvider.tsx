"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import LogoAnimation from "@/components/ui/loading-logo";
import { Get } from "@/lib/action/_get";
import { Team } from "@/lib/placeholder-data";
import { useDbUser } from "../context/DbUserProvider";

type TeamDataContext = {
  dbTeam: Team | null;
  setDbTeam: Dispatch<SetStateAction<Team | null>>;
};

const TeamContext = createContext<TeamDataContext | null>(null);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [dbTeam, setDbTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { player } = useDbUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchTeam(teamId: number) {
      try {
        const data = await Get.TeamById(teamId);

        if (!data) {
          toast({
            title: "Team Unavailable",
            description: "We are unable to find the team with this ID.",
            variant: "destructive",
          });
          router.push("/dashboard");
          return;
        }

        setDbTeam(data);
      } catch (error) {
        console.error("Failed to fetch team:", error);
        toast({
          title: "Fetching Data Failed",
          description: "Something went wrong when fetching team data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (player?.teamId) {
      fetchTeam(player.teamId);
    } else {
      setIsLoading(false); // No teamId, just stop loading
    }
  }, [player?.teamId, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  return (
    <TeamContext.Provider value={{ dbTeam, setDbTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
