import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.NEXT_PUBLIC_PIXEL_CORE_DATABASE_URL!);
export const db = drizzle(sql, { schema });

