import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("x-access-token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);

    // chore: set redirect in coookie here
    return NextResponse.redirect(loginUrl);
  }

  // 3. If the token exists, let the request proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
