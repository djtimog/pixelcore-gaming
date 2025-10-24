"use client";

import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { DbTournamentDataType } from "@/lib/placeholder-data";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "./DashboardContextProvider";
import LogoAnimation from "@/components/ui/loading-logo";

interface UidTournamentContextValue {
  tournament: DbTournamentDataType;
  host: UserProfile;
}

const UidTournament = createContext<UidTournamentContextValue | null>(null);

function UidTournamentProvider({ children }: { children: React.ReactNode }) {
  const [uidTournament, setTournament] = useState<DbTournamentDataType | null>(
    null,
  );
  const [uidHost, setUidHost] = useState<UserProfile | null>(null);
  const [loading, isLoading] = useState(false);
  const { uid } = useParams();
  const router = useRouter();

  useEffect(() => {
    isLoading(true);
    if (!uid) return;
    const fetchUidTournamentData = async () => {
      try {
        const data: DbTournamentDataType | null = await Get.TournamentByUid(
          uid as string,
        );
        if (!data) {
          toast({
            title: "Tournament Not Found",
            description: "The tournament you are looking for does not exist.",
          });
          router.push("/dashboard/tournaments");
          return;
        }

        const hostData = await Get.UserById(data.organizerId);
        if (!hostData) {
          toast({
            title: "Organizer Not Found",
            description: "Could not fetch organizer data.",
          });
          router.push("/dashboard/tournaments");
          return;
        }
        setTournament(data);
        setUidHost(hostData);
        isLoading(false);
      } catch (error) {
        console.error("Error fetching tournament details:", error);
        toast({
          title: "Error",
          description: "Something went wrong while loading tournament data.",
          variant: "destructive",
        });
      }
    };
    fetchUidTournamentData();
  }, [router, uid]);

  if (loading || !uidHost || !uidTournament) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  const contextValue: UidTournamentContextValue = {
    tournament: uidTournament,
    host: uidHost,
  };

  return (
    <UidTournament.Provider value={contextValue}>
      {children}
    </UidTournament.Provider>
  );
}

export default UidTournamentProvider;

export const useUidData = () => {
  const context = useContext(UidTournament);

  if (!context) {
    throw new Error("useUidData must be used within a UidTournamentProvider");
  }
  return context;
};
