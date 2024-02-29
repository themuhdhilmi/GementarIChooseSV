import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl
  const token = await getToken({ req: request })

  const response = await fetch(`http://127.0.0.1:3000/api/v1/AUTH/global/user/` + token?.email)
  const data = await response.json()

  const user = data?.user

  const Redirect = () => {
    if (user?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (user?.role === 'LECTURER') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (user?.role === 'STUDENT') {
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  //PAGE ACCESS MIDDLEWARE
  if (token) {
    if (pathname.includes('/dashboard/admin') && user?.role !== 'ADMIN') {
      return Redirect()
    }
  } else {
    if (pathname.includes('/dashboard/admin')) return Redirect()
    if (pathname.includes('/dashboard/lecturer')) return Redirect()
    if (pathname.includes('/dashboard/view/profileSettings')) return Redirect()
    // if (pathname.includes('/dashboard/student')) return Redirect()
  }

  //API ACCESS MIDDLEWARE
  if (token) {
    // if (pathname.includes('/dashboard/admin') && user?.role != 'ADMIN') {
    //   return Redirect()
    // }
  } else {
    // if (pathname.includes('/dashboard/admin')) return Redirect()
    // if (pathname.includes('/dashboard/lecturer')) return Redirect()
    // if (pathname.includes('/dashboard/view/profileSettings')) return Redirect()
    // if (pathname.includes('/dashboard/student')) return Redirect()
  }
}

export const config = {
  matcher: ['/auth/signin', '/dashboard/:path*', '/teacher/:path*', '/student/:path*', '/api/admin/:function*', '/api/teacher/:function*', '/api/student/:function*'],
}
