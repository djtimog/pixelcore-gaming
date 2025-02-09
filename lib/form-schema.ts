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