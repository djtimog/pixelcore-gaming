import React from "react";
import PlayerProvider from "../provider/player-provider";
import PlayerSignUpForm from "../form/player-form";

const PlayerSignUp = () => {
  return (
    <PlayerProvider>
      <PlayerSignUpForm />
    </PlayerProvider>
  );
};

export default PlayerSignUp;
