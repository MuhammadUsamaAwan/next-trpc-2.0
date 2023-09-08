import { NextResponse, type NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/utils';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const claims = await verifyJWT(token);
  if (claims === null) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard'],
};
