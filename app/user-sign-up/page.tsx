import React from "react";
import UserProvider from "../provider/user-provider";
import UserSignUpForm from "../form/user";

const UserSignUp = () => {
  return (
    <UserProvider>
      <UserSignUpForm />
    </UserProvider>
  );
};

export default UserSignUp;
