import React, { ReactNode } from "react";
import PlayerProvider from "../provider/schedule-provider";

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return <PlayerProvider>{children}</PlayerProvider>;
}
