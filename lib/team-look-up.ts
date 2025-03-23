import { toast } from "@/hooks/use-toast";
import { Get } from "./action/_get";
import { Dispatch, SetStateAction } from "react";

export const handleTeamLookup = async (secret_code: string, setTeamId: Dispatch<SetStateAction<number | null>>) => {
    if (!secret_code) return;

    try {
      const team = await Get.TeamBySecretCode(secret_code);

      if (team) {
        setTeamId(team.id);
        toast({
          title: "Team found!",
          description: `You joined ${team.name}.`,
        });
      } else {
        setTeamId(null);
        toast({
          title: "Invalid Code",
          description: "No team found with this secret code.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error finding team:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving the player to team",
        variant: "destructive",
      });
    }
  };