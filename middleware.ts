import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Set a custom header to indicate that the middleware processed the request
    response.headers.set('X-Middleware-Cache', 'miss')

    return response
}

export const config = {
    matcher: '/:path*',
}

