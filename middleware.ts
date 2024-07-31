import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked 'async' if using 'await' inside

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/sign-in" || path === "/sign-up" || path === "/";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // return NextResponse.redirect(new URL("/", request.nextUrl));
    return;
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/ask-question"],
};
