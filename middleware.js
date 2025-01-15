import { NextResponse } from 'next/server'

export function middleware(request) {
  // No checks needed, all requests to /admin01898885938 are allowed
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin01898885938/:path*'],
}

