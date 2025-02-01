import React, { ReactNode } from "react";
import PlayerProvider from "../provider/player-provider";

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return <PlayerProvider>{children}</PlayerProvider>;
}
