import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked 'async' if using 'await' inside

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;

  // const publicPaths = ["/sign-in", "/sign-up", "/"];

  // const isPublicPath = publicPaths.includes(path);

  // const token = request.cookies.get("token")?.value || "";

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  // }
  return null;
}

export const config = {
  matcher: [
    "/",
    "/community",
    "/profile",
    "/login",
    "/signup",
    "/ask-question",
  ],
};
