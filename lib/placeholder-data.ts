import { usersTable } from "@/config/schema";
import { PlayerFormSchema, ProfileFormSchema, UserFormSchema } from "./form-schema";
import { z } from "zod";

export type UserData = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  discordHandle: string | null;
  role: "player" | "admin" | "team_manager";
  imageUrl: string;
  isSubscribed: boolean;
  isVerified: boolean;
  createdAt: Date;
};

export type PlayerData = {
  userId: number;
  teamId: number | null;
  gameId: number;
  gameHandle: string | null;
  rank: string | null;
  uid: string;
  level: number;
};

export type updateUserData = {
  name: string;
  username: string;
  phoneNumber: string | null;
  discordHandle: string | null;
  role: "player" | "admin" | "team_manager";
  imageUrl: string;
  isSubscribed: boolean;
};

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export type PlayerFormValues = z.infer<typeof PlayerFormSchema>;

export type UserFormValues = z.infer<typeof UserFormSchema>;

export type DatabaseUser = typeof usersTable.$inferSelect;
