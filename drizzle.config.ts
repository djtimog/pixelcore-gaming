import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_8PBMCjxc3vfi@ep-wandering-waterfall-a55m02sm-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
