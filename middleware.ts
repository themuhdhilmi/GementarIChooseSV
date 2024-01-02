import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from './prisma/client';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = request.cookies.get('next-auth.session-token')?.value;

  const user = await prisma.user.findUnique(
    {
        where: {
            id: token
        },
    }
  )

  return NextResponse.redirect(new URL('/lol' + (JSON.stringify(user)), request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/panel',
}