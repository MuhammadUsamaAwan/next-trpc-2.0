import { cookies } from 'next/headers';
import type { Claims } from '@/types';
import { jwtVerify } from 'jose';

import { env } from '@/env.mjs';

export async function getUser() {
  const token = cookies().get('token')?.value;
  return verifyJWT(token);
}

export async function verifyJWT(token: string | undefined) {
  if (!token) return null;
  try {
    const user = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return user.payload as Claims;
  } catch (error) {
    return null;
  }
}
