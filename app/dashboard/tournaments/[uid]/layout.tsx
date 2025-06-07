import UidTournamentProvider from "@/app/_components/context/UidTournamentProvider";
import React from "react";

function UidLayout({ children }: { children: React.ReactNode }) {
  return <UidTournamentProvider>{children}</UidTournamentProvider>;
}

export default UidLayout;
