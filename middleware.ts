'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    console.log('Running middleware-----')
    if (request.method === 'OPTIONS') {
        console.log('Preflight request middleware-----')
        let response = NextResponse.json(
            { status: 200 }
        )

        // add the CORS headers to the response
        response.headers.set('Access-Control-Allow-Credentials', "true")
        response.headers.set('Access-Control-Allow-Origin', '*') // replace this your actual origin
        response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
        response.headers.set(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        return response
    }
    const requestHeaders = new Headers(request.headers)
    
    // You can also set request headers in NextResponse.rewrite
    let response = NextResponse.next({
        request: {
        // New request headers
            headers: requestHeaders,
        },
    })
    response.headers.set('Access-Control-Allow-Credentials', "true")
    response.headers.set('Access-Control-Allow-Origin', '*') // replace this your actual origin
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    response.headers.set(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return response

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:function*',
}