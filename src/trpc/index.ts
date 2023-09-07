import { cookies } from 'next/headers';
import { initTRPC, TRPCError } from '@trpc/server';

import { db } from '@/db';
import { verifyJWT } from '@/lib/utils';

export const createContext = async () => createCtx(cookies().get('token')?.value);

export const createCtx = async (token: string | undefined) => {
  const user = await verifyJWT(token);
  return {
    db,
    user,
  };
};

const t = initTRPC.context<typeof createContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
