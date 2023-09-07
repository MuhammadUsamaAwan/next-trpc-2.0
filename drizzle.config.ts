import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config();

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
} satisfies Config;
