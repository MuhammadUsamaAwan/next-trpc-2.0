import { cookies } from 'next/headers';
import { createCtx } from '@/trpc';
import { appRouter } from '@/trpc/router';

export const trpc = appRouter.createCaller(await createCtx(cookies().get('token')?.value));

export type TRPCClient = typeof trpc;
