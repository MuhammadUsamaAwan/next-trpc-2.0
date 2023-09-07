import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifyJWT } from './lib/server-utils';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = await verifyJWT(token);
  if (user === null) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard'],
};
