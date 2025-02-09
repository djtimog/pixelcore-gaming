import React from "react";
import PlayerProvider from "../_components/provider/player-provider";
import PlayerSignUpForm from "../_components/form/player-form";

const PlayerSignUp = () => {
  return (
    <PlayerProvider>
      <PlayerSignUpForm />
    </PlayerProvider>
  );
};

export default PlayerSignUp;
