import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const isLoggedIn = req.cookies.get("loggedIn");
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}


export const config = {
    matcher: [
        "/",
        "/product/:path*",
        "/category/:path*",
        "/order/:path*",
        "/profile/:path*",
        "/report/:path*",
        "/promotion/:path*",
    ],
};
