import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { Post } from "@/lib/action/_post";
import {
  PlayerFormValues,
  TournamentFormValues,
  UserFormValues,
} from "@/lib/placeholder-data";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { uploadImageWithFile }from "@/lib/action/uploadImage";
import { uploadedProfileImageUrl } from "./image-upload";

export const onSubmitForm = {
  User: async (
    data: UserFormValues,
    user: ReturnType<typeof useUser>["user"],
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    selectedImageFile: File | null,
    router: AppRouterInstance,
  ) => {
    setIsLoading(true);
    const updatedImageUrl = await uploadedProfileImageUrl(
      user,
      selectedImageFile,
    );

    try {
      const userData = {
        name: data.name.slice(0, 255),
        username: data.username.slice(0, 255),
        email: data.email.slice(0, 255),
        phoneNumber: data.phoneNumber?.slice(0, 15) || null,
        discordHandle: data.discordHandle?.slice(0, 50) || null,
        role: data.role,
        imageUrl: updatedImageUrl!,
        isSubscribed: data.isSubscribed,
        isVerified: false,
        createdAt: new Date(),
      };

      const existingUser = await Get.UserByEmail(userData.email);

      if (!existingUser) {
        await Post.UserData(userData);
        toast({
          title: "Success!",
          description: "Profile created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "User already exists",
          variant: "destructive",
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  },
  Player: async (
    data: PlayerFormValues,
    user: ReturnType<typeof useUser>["user"],
    teamId: number | null,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    router: AppRouterInstance,
  ) => {
    setIsLoading(true);

    try {
      if (!user) return;

      const userEmail = user.emailAddresses[0]?.emailAddress || "";
      // const userName = user.username || "";

      const existingUser = await Get.UserByEmail(userEmail);

      if (existingUser?.email !== userEmail) {
        toast({
          title: "Error",
          description: "User not found!!",
          variant: "destructive",
        });
        router.push("/user-sign-up");
        return;
      }

      const userId = existingUser.id;
      if (existingUser.role !== "player") {
        toast({
          title: "Error",
          description: "You are not authorized to register as a player.",
          variant: "destructive",
        });
        router.push("/user-sign-up");
        return;
      }

      const existingPlayer = await Get.PlayerByUserId(userId);

      if (existingPlayer) {
        toast({
          title: "Error",
          description: "You are already registered as a player.",
          variant: "destructive",
        });
        return;
      }

      const games = await Get.Games();

      //player data
      const playerData = {
        userId: userId,
        teamId: teamId,
        gameId:
          games.find((game: typeof games) => game.name === data.game)?.id || 1,
        gameHandle: data.game_handle.slice(0, 255) || null,
        rank: data.rank?.slice(0, 100) || null,
        uid: data.uid.slice(0, 255),
        level: data.level,
      };

      // Insert player into the database
      await Post.PlayerData(playerData);

      toast({
        title: "Success!",
        description: "Player registered successfully.",
      });
      router.push("/player-info");
    } catch (error) {
      console.error("Error saving player:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  },
  Tournament: async (
    data: TournamentFormValues,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    image: File | null,
    organizerId: number,
    router: AppRouterInstance,
  ) => {
    setIsLoading(true);

    try {
      const uuid = uuidv4();
      const imageName = `${uuid}-${data.name}`;
      let imageUrl: string | null = null;
      if (!image) {
        toast({
          title: "Error",
          description: "Please upload an image",
          variant: "destructive",
        });
        return;
      }

      try {
        imageUrl = await uploadImageWithFile(image, imageName, "tournaments");
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      const tournamentData = {
        name: data.name.slice(0, 255),
        uid: uuid,
        description: data.description?.slice(0, 255) || "",
        startDate: data.startDate.toDateString(),
        endDate: data.endDate.toDateString(),
        imageUrl: imageUrl || "/fallback-tournament.jpg",
        registrationStartDate: data.registrationStartDate.toDateString(),
        registrationEndDate: data.registrationEndDate.toDateString(),
        gameId: data.gameId,
        organizerId: organizerId,
        prizePool: data.prizePool?.slice(0, 255) || "",
        maxTeams: data.maxTeams,
        maxPlayersPerTeam: data.maxPlayersPerTeam,
        rules: data.rules || "",
        time: data.time,
        timezone: data.timezone,
      };

      await Post.TournamentData(tournamentData);

      toast({
        title: "Success!",
        description: "Tournament created successfully",
      });
    } catch (error) {
      console.error("Error saving tournament:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving tournament data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.push("/dashboard/tournaments")
    }
  },
};
