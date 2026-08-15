// lib/auth-cookies.ts
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

/**
 * Parses Set-Cookie headers from a backend response and applies them to Next.js cookie store.
 * MUST be called within a Server Action or Route Handler context.
 */
export async function syncBackendCookies(
  backendResponse: Response,
): Promise<void> {
  const rawSetCookies = backendResponse.headers.getSetCookie();
  if (!rawSetCookies || rawSetCookies.length === 0) return;

  const parsedCookies = setCookieParser.parse(rawSetCookies);
  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    if (cookie.name === "x-access-token" || cookie.name === "x-refresh-token") {
      cookieStore.set(cookie.name, cookie.value, {
        httpOnly: true,
        path: "/",
        maxAge: cookie.maxAge,
        expires: cookie.expires,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  }
}
