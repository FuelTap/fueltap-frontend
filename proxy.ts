import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_RETURN_COOKIE,
  authReturnCookieOptions,
  createAuthReturn,
} from "@/lib/helpers/auth-return";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("x-access-token")?.value;
  const response = token
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", request.url));

  const isPrefetch = request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose")?.includes("prefetch");

  // Record actual protected-page visits and actions, including requests that
  // are subsequently rejected by the server layout or session refresh.
  if (!isPrefetch) {
    const saved = createAuthReturn(request.nextUrl.pathname + request.nextUrl.search);
    if (saved) response.cookies.set(AUTH_RETURN_COOKIE, saved, authReturnCookieOptions);
  }

  return response;
}

export const config = {
  matcher: ["/user/:path*"],
};
