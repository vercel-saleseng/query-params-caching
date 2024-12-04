import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Match '/pokemon/:path+'
    if (pathname.startsWith('/pokemon/')) {
        console.log('MIDDLEWARE RUNNING FOR POKEMON PATH')
        const response = NextResponse.next()

        // Set cache control headers
        response.headers.set('Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')

        // // Include specific query parameters in the cache key
        // const url = request.nextUrl.clone()
        // url.searchParams.delete('page')
        // url.searchParams.delete('search')
        response.headers.set('CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')
        response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')

        // console.log(response)

        return response
    }
}

export const config = {
    matcher: '/pokemon/:path*',
}