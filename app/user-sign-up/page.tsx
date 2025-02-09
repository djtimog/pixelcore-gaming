import React from "react";
import UserProvider from "../_components/provider/user-provider";
import UserSignUpForm from "../_components/form/user-form";

const UserSignUp = () => {
  return (
    <UserProvider>
      <UserSignUpForm />
    </UserProvider>
  );
};

export default UserSignUp;
