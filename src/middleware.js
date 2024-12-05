import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl


    const response = NextResponse.next()

    // Set cache control headers
    response.headers.set('Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')

    console.log('MIDDLEWARE RUNNING FOR', pathname, response)

    return response
}

export const config = {
    matcher: ['/pokemon/:path*', '/']
}