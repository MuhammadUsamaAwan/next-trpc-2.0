import { appRouter } from '@/server/router';

import { db } from '@/db';

export const trpc = appRouter.createCaller({
  db,
});

export type TRPCClient = typeof trpc;
