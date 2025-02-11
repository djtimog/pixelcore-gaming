import { usersTable } from "@/config/schema";
import {
  PlayerFormSchema,
  ProfileFormSchema,
  UserFormSchema,
  TeamFormSchema,
} from "./form-schema";
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

export type UpdateUserData = {
  name: string;
  username: string;
  phoneNumber: string | null;
  discordHandle: string | null;
  role: "player" | "admin" | "team_manager";
  imageUrl: string;
  isSubscribed: boolean;
};

export type UpdateTeamData = {
  name: string;
  gameId: number;
  captainId: number;
  logoUrl: string;
};

export type TeamData = {
  name: string;
  logoUrl: string | null;
  id: number;
  createdAt: Date | null;
  captainId: number;
  secretCode: string;
  gameId: number;
};

export type TeamPlayersData = {
  id: number;
  gameId: number;
  userId: number;
  teamId: number | null;
  gameHandle: string | null;
  rank: string | null;
  uid: string;
  level: number | null;
  isCaptain: boolean | null;
};
export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export type PlayerFormValues = z.infer<typeof PlayerFormSchema>;

export type UserFormValues = z.infer<typeof UserFormSchema>;

export type DatabaseUser = typeof usersTable.$inferSelect;

export type TeamFormValues = z.infer<typeof TeamFormSchema>;
