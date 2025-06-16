"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useTeam } from "../context/DbTeamProvider";

type TeamCreateContext = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  teamCode: string;
  setTeamCode: Dispatch<SetStateAction<string>>;
};

const TeamCreateContext = createContext<TeamCreateContext | null>(null);

export default function TeamCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const router = useRouter();
  const { dbTeam } = useTeam();

  useEffect(() => {
    console.log(dbTeam);
    if (dbTeam) {
      setTeamCode(dbTeam.secretCode);
      setOpenDialog(true);
    }
  }, [router, dbTeam]);

  return (
    <TeamCreateContext.Provider
      value={{ openDialog, setOpenDialog, teamCode, setTeamCode }}
    >
      {children}
    </TeamCreateContext.Provider>
  );
}

export const useTeamCreate = () => {
  const context = useContext(TeamCreateContext);

  if (!context) {
    throw new Error("you must useContext inside TeamProvider");
  }
  return context;
};
