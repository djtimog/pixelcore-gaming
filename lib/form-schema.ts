import { z } from "zod";

export const roleEnum = ["player", "admin", "team_manager"] as const;

export const ProfileFormSchema = z.object({
  name: z.string().min(5).max(255),
  username: z.string().min(5).max(255),
  email: z.string().email().max(255),
  phoneNumber: z.string().max(15).optional(),
  discordHandle: z.string().max(50).optional(),
  role: z.enum(roleEnum).default("player"),
  imageUrl: z.string().max(255).optional(),
  isSubscribed: z.boolean().default(false),
});

export const PlayerFormSchema = z.object({
  game_handle: z.string().min(5, { message: "Game handle is required." }),
  rank: z.string().optional(),
  uid: z.string().min(7, { message: "UID is required." }),
  secret_code: z.string().optional(),
  game: z.string().min(3, { message: "Game is required." }),
  level: z
    .number()
    .min(1, { message: "level must be more than 1" })
    .max(350, { message: "level must be less than 350" }),
});

export const UserFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(255, { message: "Name cannot exceed 255 characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(255, { message: "Username cannot exceed 255 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(255, { message: "Email cannot exceed 255 characters" }),
  phoneNumber: z
    .string()
    .max(15, { message: "Phone number cannot exceed 15 characters" }),
  discordHandle: z
    .string()
    .max(50, { message: "Discord handle cannot exceed 50 characters" })
    .optional(),
  role: z.enum(["player", "admin", "team_manager"]).default("player"),
  imageUrl: z
    .string()
    .max(255, { message: "Image URL cannot exceed 255 characters" })
    .optional(),
  isSubscribed: z.boolean().default(false),
});

export const TeamFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(255, { message: "Name cannot exceed 255 characters" }),
  game: z.string().min(3, { message: "Game is required." }),
  logoUrl: z
    .string()
    .max(255, { message: "Image URL cannot exceed 255 characters" })
    .optional(),
});
