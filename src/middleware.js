import { NextResponse } from 'next/server'

export function middleware(request) {
    console.log(request)
    // gets the pathname and search 
    const { pathname, origin, searchParams } = request.nextUrl
    // Create a blank URL
    const rewriteUrl = new URL(pathname, origin);

    // Iterate through all query parameters and strip out all query params except for page
    // ADD QUERY PARAMS EXCEPTIONS BELOW:
    searchParams.forEach((value, key) => {
        if (key === 'page') {
            rewriteUrl.searchParams.append(key, value);
        }
    });

    // Rewrite the request to the striped out url with pages only 
    const response = NextResponse.rewrite(rewriteUrl)

    // Set cache control headers
    // NOTE: this is not the officially endorsed way to cache pages, it is better to use:
    // ISR (https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
    // or setting caching rules in next.config.js (https://nextjs.org/docs/pages/api-reference/next-config-js/headers#cache-control)
    response.headers.set('Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=7776000, stale-while-revalidate=604800')

    console.log('MIDDLEWARE RUNNING FOR', pathname, response)

    return response
}

export const config = {
    matcher: ['/pokemon/:path*', '/']
}