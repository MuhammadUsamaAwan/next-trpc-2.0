import { cookies } from 'next/headers';
import { publicProcedure, router } from '@/server/trpc';
import type { Claims } from '@/types';
import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { sign } from 'jsonwebtoken';

import { env } from '@/env.mjs';
import { users } from '@/db/schema';
import { loginSchema, signupSchema } from '@/lib/validations/auth';

export const todosRouter = router({
  signup: publicProcedure.input(signupSchema).query(async ({ ctx: { db }, input: { email, password } }) => {
    const hashedPassword = await hash(password);
    const [user] = await db.insert(users).values({ email, password: hashedPassword }).returning({ id: users.id });
    if (!user) throw new Error();
    const accessToken = generateAccessToken({ id: user.id, email });
    cookies().set('token', accessToken, { secure: true, httpOnly: true, sameSite: 'strict' });
    return true;
  }),
  login: publicProcedure.input(loginSchema).query(async ({ ctx: { db }, input: { email, password } }) => {
    const [user] = await db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.email, email));
    if (!user) throw new Error();
    const isPasswordCorrect = await verify(user.password, password);
    if (!isPasswordCorrect) throw new Error();
    const accessToken = generateAccessToken({ id: user.id, email });
    cookies().set('token', accessToken, { secure: true, httpOnly: true, sameSite: 'strict' });
    return true;
  }),
});

export function generateAccessToken(claims: Claims) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return sign(claims, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  }) as string;
}
