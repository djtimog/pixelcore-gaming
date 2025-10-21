"use client";

import React from "react";
import ProfileProvider from "./profile-provider";
import UserProvider from "./user-provider";
import TeamProvider from "./team-provider";
import PlayerProvider from "./player-provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ProfileProvider>
        <PlayerProvider>
          <TeamProvider>{children}</TeamProvider>
        </PlayerProvider>
      </ProfileProvider>
    </UserProvider>
  );
};

export default AppProvider;
