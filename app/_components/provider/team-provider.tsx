"use client";
import LogoAnimation from "@/components/ui/loading-logo";
import { Get } from "@/lib/action/_get";
import { Team } from "@/lib/placeholder-data";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDbUser } from "../context/DbUserProvider";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
