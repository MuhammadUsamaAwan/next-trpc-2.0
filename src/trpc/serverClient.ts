import { cookies } from 'next/headers';

import { appRouter } from '@/server/router';
import { createCtx } from '@/server/trpc';

export const trpc = appRouter.createCaller(await createCtx(cookies().get('token')?.value));

export type TRPCClient = typeof trpc;
