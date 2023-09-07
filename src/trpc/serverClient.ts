import { db } from '@/db';
import { appRouter } from '@/server/router';

export const trpc = appRouter.createCaller({
  db,
});

export type TRPCClient = typeof trpc;
