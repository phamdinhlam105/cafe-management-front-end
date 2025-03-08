import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value; 

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        const decoded = jwt.decode(token) as { exp: number } | null;

        if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
            const res = NextResponse.redirect(new URL("/login", req.url));
            res.cookies.delete("accessToken");
            return res;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            console.log("Token expired. Redirecting to login.");
            return NextResponse.redirect(new URL("/login", req.url));
        }

    } catch (error) {
        console.error("Invalid token:", error);
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
