import { usersTable } from "@/config/schema";
import {
  PlayerFormSchema,
  ProfileFormSchema,
  UserFormSchema,
  TeamFormSchema,
  TournamentFormSchema,
} from "./form-schema";
import { z } from "zod";
import { LucideIcon } from "lucide-react";

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

export type TournamentData = {
  name: string;
  uid: string;
  description: string | null;
  startDate: string; 
  endDate: string; 
  imageUrl: string;
  registrationStartDate: string;
  registrationEndDate: string;
  gameId: number;
  organizerId: number;
  prizePool: string | null;
  maxTeams: number;
  maxPlayersPerTeam: number;
  rules: string | null;
  time: string;
  timezone: string;
};

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export type PlayerFormValues = z.infer<typeof PlayerFormSchema>;

export type UserFormValues = z.infer<typeof UserFormSchema>;

export type DatabaseUser = typeof usersTable.$inferSelect;

export type TeamFormValues = z.infer<typeof TeamFormSchema>;

export type TournamentFormValues = z.infer<typeof TournamentFormSchema>;

export interface TournamentCardProps {
  imageUrl: string
  title: string
  prize: number
  game: string
  players: number
  time: string
  date: string
  host: string
  rules: string[]
  detailsLink: string
  applyLink: string
  hostLink: string
  starred?:boolean
}

export interface EventCardProps {
  title: string
  description: string
  imageUrl: string
  readMoreLink: string
}

export interface EventsCarouselProps {
  events: EventCardProps[]
}

export interface TeamCardProps {
  name: string
  logoUrl: string
  manager: {
    name: string
    avatarUrl: string
  }
  managerProfileLink: string
  game?: string
}

export type TeamCarouselProps = TeamCardProps[]

export type ReferItemProps = {
  name: string;
  description: string;
  Icon: LucideIcon;
  ActionIcon: LucideIcon;
  action: () => Promise<void>;
};

export type RefersAccount = {
  id: number;
  imageUrl?: string;
  name: string;
  email: string;
  createdAt: Date;
};