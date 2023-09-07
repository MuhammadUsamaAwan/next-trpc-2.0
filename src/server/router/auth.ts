import { TextEncoder } from 'util';
import { cookies } from 'next/headers';
import type { JWTPayload } from '@/types';
import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';

import { env } from '@/env.mjs';
import { users } from '@/db/schema';
import { publicProcedure, router } from '@/server/trpc';
import { loginSchema, signupSchema } from '@/lib/validations/auth';

export const todosRouter = router({
  signup: publicProcedure.input(signupSchema).query(async ({ ctx: { db }, input: { email, password } }) => {
    const hashedPassword = await hash(password);
    const [user] = await db.insert(users).values({ email, password: hashedPassword }).returning({ id: users.id });
    if (!user) throw new Error();
    await setAccessToken({ id: user.id, email });
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
    await setAccessToken({ id: user.id, email });
    return true;
  }),
});

async function setAccessToken(jwtPayload: JWTPayload) {
  const accessToken = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(new TextEncoder().encode(env.JWT_SECRET));

  cookies().set('token', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    expires: Number(env.COOKIES_EXPIRES),
  });
}
