import { NextResponse } from "next/server";

export function middleware(req) {
    //
    const hasToken = req.cookies.get("token")?.value || null;
    //
    if (req.nextUrl.pathname("/profile")) {
        if (hasToken) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/auth", req.url));
        }
    }

    return NextResponse.next();
}
