import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { toast } from "sonner";
export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        const decoded = jwt.decode(token) as { exp: number, role: string } | null;

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
        const url = req.nextUrl.clone();
        const role = decoded.role;
        if (url.pathname.startsWith("/setrole") && !["administrator", "Quản lý"].includes(role)) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();

    } catch (error) {
        console.error("Invalid token:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
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
        "/stock/:path*",
        "/setrole/:path*",
        "/new-order/:path*",
        "/new-product/:path*",
    ],
};
