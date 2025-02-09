import React from "react";
import ProfileProvider from "../_components/provider/profile-provider";
import UserProfilePage from "../_components/form/profille-form";

export default function Profile() {
  return (
    <ProfileProvider>
      <UserProfilePage />
    </ProfileProvider>
  );
}
