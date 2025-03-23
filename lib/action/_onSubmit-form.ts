import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { Post } from "@/lib/action/_post";
import { uploadedImageUrl } from "@/lib/image-upload";
import { PlayerFormValues, UserFormValues } from "@/lib/placeholder-data";
import { useUser } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const onSubmitForm = {
  User: async (
    data: UserFormValues,
    user: ReturnType<typeof useUser>["user"],
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    selectedImageFile: File | null,
    router: AppRouterInstance
  ) => {
    setIsLoading(true);
    const updatedImageUrl = await uploadedImageUrl(user, selectedImageFile);

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
    router: AppRouterInstance
  ) => {
    setIsLoading(true);

    try {
      if (!user) return;

      const userEmail = user.emailAddresses[0]?.emailAddress || "";
      const userName = user.username || "";

      const existingUser = await Get.UserByEmail(userEmail);

      if (existingUser?.name !== userName) {
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
        gameId: games.find((game) => game.name === data.game)?.id || 1,
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
      router.push("/schedule");
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
};
