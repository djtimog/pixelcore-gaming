import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { Delete, Post, Update } from "@/lib/action/_post";
import {
  DbTournamentDataType,
  FeedbackData,
  PlayerFormValues,
  TournamentAnnouncementData,
  TournamentFormValues,
  UserFormValues,
} from "@/lib/placeholder-data";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { uploadImageWithFile } from "@/lib/action/uploadImage";
import { uploadedProfileImageUrl } from "./image-upload";
import { GetIdByReferralCode } from "../referralCodeGenerator";

export const onSubmitForm = {
  User: async (
    data: UserFormValues,
    user: ReturnType<typeof useUser>["user"],
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    selectedImageFile: File | null,
    router: AppRouterInstance,
    referralCode: string,
  ) => {
    setIsLoading(true);
    const updatedImageUrl = await uploadedProfileImageUrl(
      user,
      selectedImageFile,
    );
    if (referralCode !== "") {
      try {
        const referralId = GetIdByReferralCode(referralCode);
        if (!referralId) {
          toast({
            title: "Error",
            description: "Invalid referral code",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        data.referredBy = referralId;
      } catch (error) {
        console.error("Error fetching referral code:", error);
        toast({
          title: "Error",
          description: "An error occurred while validating the referral code",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

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
        referredBy: data.referredBy || null,
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

      if (existingUser?.email !== userEmail || !existingUser) {
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
        gameId: games.find((game) => game.name === data.game)?.id || 0,
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
      throw new Error(`${error}`);
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
    tournament: DbTournamentDataType | null,
  ) => {
    setIsLoading(true);
    if (!tournament) {
      try {
        const uuid = uuidv4();
        const imageName = `${uuid}-${data.name}`;
        let imageUrl: string | null = null;

        if (!image) {
          toast({
            title: "Missing Image",
            description: "Please upload an image before submitting.",
            variant: "destructive",
          });
          return;
        }

        try {
          imageUrl = await uploadImageWithFile(image, imageName, "tournaments");
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          toast({
            title: "Upload Failed",
            description: "Could not upload the image. Please try again.",
            variant: "destructive",
          });
          return;
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
          title: "Success",
          description: "Tournament created successfully.",
        });

        setIsLoading(false);
        router.push(`/dashboard/tournaments/${uuid}`);
      } catch (err) {
        console.error("Failed to create tournament:", err);
        toast({
          title: "Submission Failed",
          description: "An error occurred while saving tournament data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        router.refresh();
      }
    } else {
      try {
        let imageUrl: string | null = null;
        const imageName = `${tournament.uid}-${data.name}`;

        if (image) {
          try {
            imageUrl = await uploadImageWithFile(
              image,
              imageName,
              "tournaments",
            );
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            toast({
              title: "Upload Failed",
              description: "Could not upload the image. Please try again.",
              variant: "destructive",
            });
            return;
          }
        }

        const tournamentData = {
          name: data.name.slice(0, 255),
          uid: tournament.uid,
          description: data.description?.slice(0, 255) || "",
          startDate: data.startDate.toDateString(),
          endDate: data.endDate.toDateString(),
          imageUrl: imageUrl || tournament.imageUrl,
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

        await Update.TournamentData(tournamentData, tournament.id);
        toast({
          title: "Update Successful",
          description: "Tournament updated successfully.",
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to update tournament:", err);
        toast({
          title: "Update Failed",
          description: "An error occurred while updating tournament data.",
          variant: "destructive",
        });
      } finally {
        router.refresh();
        setIsLoading(false);
      }
    }
  },
  StarTourament: async (
    isStarred: boolean,
    setIsStarred: Dispatch<SetStateAction<boolean>>,
    tournamentId: number,
    playerId: number,
  ) => {
    const starredTournaments = await Get.StarredTournamentByPlayerId(playerId);

    if (isStarred) {
      try {
        const starredTournament = starredTournaments.find(
          (tournament) => tournament.tournamentId === tournamentId,
        );

        await Delete.StarTournament(starredTournament?.id || 0);
      } catch (error) {
        console.error("Error unstarring tournament:", error);
      } finally {
        setIsStarred(false);
      }
    } else {
      try {
        await Post.StarTournament(tournamentId, playerId);
      } catch (error) {
        console.error("Error starring tournament:", error);
      } finally {
        setIsStarred(true);
      }
    }
  },
  Feedback: async (feedbackData: FeedbackData, router: AppRouterInstance) => {
    try {
      await Post.FeedbackData(feedbackData);
      toast({
        title: "Success!",
        description: "Feedback submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting feedback",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  },
  Announcement: async (
    announcementData: TournamentAnnouncementData,
    router: AppRouterInstance,
  ) => {
    try {
      await Post.AnnouncementData(announcementData);
      toast({
        title: "Success!",
        description: "Announcement submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting announcement:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting announcement",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  },
};
