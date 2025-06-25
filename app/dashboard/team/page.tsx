"use client";
import { useTeam } from "@/app/_components/context/DashboardContextProvider";
import NoTeamPage from "@/components/ui/dashboard/team/no-team-page";
import DbTeamPage from "@/components/ui/dashboard/team/_page";

export default function TeamPage() {
  const { dbTeam } = useTeam();

  if (!dbTeam) {
    return <NoTeamPage />;
  }

  return <DbTeamPage team={dbTeam} />;
}
