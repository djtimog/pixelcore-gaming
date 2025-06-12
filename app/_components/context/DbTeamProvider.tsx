"use client";
import LogoAnimation from "@/components/ui/loading-logo";
import { Get } from "@/lib/action/_get";
import { Team } from "@/lib/placeholder-data";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDbUser } from "../context/DbUserProvider";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type TeamDataContext = {
  dbTeam: Team | null;
  setDbTeam: Dispatch<SetStateAction<Team | null>>;
};

const TeamContext = createContext<TeamDataContext | null>(null);

export default function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dbTeam, setDbTeam] = useState<Team | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { player } = useDbUser();
  const router = useRouter();

  useEffect(() => {
    if (player.teamId) {
      async function fetch(teamId: number) {
        try {
          const data = await Get.TeamById(teamId);
          if (!data) {
            toast({
              title: "Team Unavailable",
              description: "We are unable to find the team with Id",
              variant: "destructive",
            });
            router.push("/dashboard");
          }
          setDbTeam(data);
        } catch (error) {
          console.error(error);
          toast({
            title: "Fetching Data Failed",
            description: "Something went wrong when fetching Team Data",
            variant: "destructive",
          });
        }
      }
      fetch(player.teamId);
    }
    setPageLoading(false);
  }, [router]);

  if (pageLoading) {
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
    throw new Error("you must useContext inside TeamProvider");
  }
  return context;
};
