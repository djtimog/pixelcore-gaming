import { toast } from "@/hooks/use-toast";
import { Get } from "./action/_get";
import { Dispatch, SetStateAction } from "react";

  export const lookUpGames = async (setGameNames: Dispatch<SetStateAction<string[]>>) => {
    try {
      const games = await Get.Games();
      setGameNames(games.map((game) => game.name));
    } catch (error) {
      console.log("Error fetching games:", error);
      toast({
        title: "Fetch Failed",
        description: "An error occurred while fetching games",
        variant: "destructive",
      });
    }
  };