import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Extract session ID from cookies

    const sessionCookie = request.cookies.get('connect.sid')?.value;
    //console.log("Middleware cookie: ", request.cookies.getAll());

    // If you need to pass this session ID to your API routes,
    // you can add it as a header.
    const headers = new Headers(request.headers);
    if (sessionCookie) {
        headers.set('Cookie', `connect.sid=${sessionCookie}`);
    }

    // Return the modified request
    return NextResponse.next({
        request: { headers },
    });
}