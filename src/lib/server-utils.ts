import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/utils';

export async function getUser() {
  const token = cookies().get('token')?.value;
  return verifyJWT(token);
}
