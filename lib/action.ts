'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const PlayerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Player name is required.' }),
  role: z.string().min(1, { message: 'Player role is required.' }),
  inGameDetails: z.object({
    kda: z.number().nonnegative({ message: 'KDA must be non-negative.' }),
    kills: z.number().int().nonnegative({ message: 'Kills must be non-negative.' }),
    deaths: z.number().int().nonnegative({ message: 'Deaths must be non-negative.' }),
    assists: z.number().int().nonnegative({ message: 'Assists must be non-negative.' }),
  }),
});

const AdminSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Admin name is required.' }),
  role: z.string().min(1, { message: 'Admin role is required.' }),
});

const TeamSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Team name is required.' }),
  region: z.string().min(1, { message: 'Region is required.' }),
  socials: z.object({
    discord: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }).optional(),
});

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

export async function createPlayer(formData: FormData) {
  const validatedFields = PlayerSchema.safeParse({
    name: formData.get('name'),
    role: formData.get('role'),
    inGameDetails: {
      kda: Number(formData.get('kda')),
      kills: Number(formData.get('kills')),
      deaths: Number(formData.get('deaths')),
      assists: Number(formData.get('assists')),
    },
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Could not create player.',
    };
  }

  const { name, role, inGameDetails } = validatedFields.data;

  try {
    await sql`
      INSERT INTO players (name, role, kda, kills, deaths, assists)
      VALUES (${name}, ${role}, ${inGameDetails.kda}, ${inGameDetails.kills}, ${inGameDetails.deaths}, ${inGameDetails.assists})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error. Could not create player.' };
  }

  revalidatePath('/dashboard/players');
  redirect('/dashboard/players');
}

export async function createAdmin(formData: FormData) {
  const validatedFields = AdminSchema.safeParse({
    name: formData.get('name'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Could not create admin.',
    };
  }

  const { name, role } = validatedFields.data;

  try {
    await sql`
      INSERT INTO admins (name, role)
      VALUES (${name}, ${role})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error. Could not create admin.' };
  }

  revalidatePath('/dashboard/admins');
  redirect('/dashboard/admins');
}

export async function createTeam(formData: FormData) {
  const validatedFields = TeamSchema.safeParse({
    name: formData.get('name'),
    region: formData.get('region'),
    socials: {
      discord: formData.get('discord')?.toString(),
      tiktok: formData.get('tiktok')?.toString(),
      twitter: formData.get('twitter')?.toString(),
      instagram: formData.get('instagram')?.toString(),
    },
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Could not create team.',
    };
  }

  const { name, region, socials } = validatedFields.data;

  try {
    await sql`
      INSERT INTO teams (name, region, discord, tiktok, twitter, instagram)
      VALUES (${name}, ${region}, ${socials?.discord}, ${socials?.tiktok}, ${socials?.twitter}, ${socials?.instagram})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error. Could not create team.' };
  }

  revalidatePath('/dashboard/teams');
  redirect('/dashboard/teams');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
