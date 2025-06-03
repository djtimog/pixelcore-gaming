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
  referredBy: z.number().optional(),
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

export const TournamentFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().optional(),
  startDate: z.coerce.date({
    required_error: "Start date is required",
  }),
  endDate: z.coerce.date({
    required_error: "End date is required",
  }),
  imageUrl: z.string().url("Must be a valid URL").max(255),
  registrationStartDate: z.coerce.date({
    required_error: "Registration start date is required",
  }),
  registrationEndDate: z.coerce.date({
    required_error: "Registration end date is required",
  }),
  gameId: z.number({
    required_error: "Game is required",
    invalid_type_error: "Game must be a number",
  }),
  organizerId: z.number({
    required_error: "Organizer is required",
    invalid_type_error: "Organizer must be a number",
  }),
  prizePool: z.string().max(255).optional().default("0"),
  maxTeams: z
    .number({
      required_error: "Max teams is required",
      invalid_type_error: "Max teams must be a number",
    })
    .int()
    .positive("Must be greater than 0"),
  maxPlayersPerTeam: z
    .number({
      required_error: "Max players per team is required",
      invalid_type_error: "Max players per team must be a number",
    })
    .int()
    .positive("Must be greater than 0"),
  rules: z.string().optional(),
  status: z
    .enum(["upcoming", "ongoing", "completed"])
    .optional()
    .default("upcoming"),
  time: z.string().min(1, "Match time is required").max(50),
  timezone: z.string().min(1, "Timezone is required").max(50),
});


