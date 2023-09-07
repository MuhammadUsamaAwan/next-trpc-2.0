import type { JWTPayload } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { jwtVerify } from 'jose';
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export async function verifyJWT(token: string | undefined) {
  if (!token) return null;
  try {
    const user = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return user.payload as JWTPayload;
  } catch (error) {
    return null;
  }
}
