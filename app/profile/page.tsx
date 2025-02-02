import React from "react";
import ProfileProvider from "../provider/profile-provider";
import UserProfilePage from "../form/profille-form";

export default function Profile() {
  return (
    <ProfileProvider>
      <UserProfilePage />
    </ProfileProvider>
  );
}
