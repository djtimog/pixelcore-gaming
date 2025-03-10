'use server';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.PIXEL_CORE_DATABASE_URL!);

export const db = drizzle({ client: sql });