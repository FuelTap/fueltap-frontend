export const AUTH_RETURN_COOKIE = "fueltap-auth-return";
export const AUTH_RETURN_MAX_AGE = 30 * 60;
export const DEFAULT_AUTH_DESTINATION = "/user/dashboard";

export const authReturnCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: AUTH_RETURN_MAX_AGE,
};

export function safeReturnPath(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  // Reject encoded path tricks, backslashes and control characters.
  if (/[\\\x00-\x20\x7f]/.test(value)) return null;
  try {
    const url = new URL(value, "https://fueltap.invalid");
    if (
      !value.startsWith("/user/") ||
      url.origin !== "https://fueltap.invalid" ||
      !url.pathname.startsWith("/user/") ||
      /%|\\/.test(url.pathname)
    ) {
      return null;
    }
    // Internal RSC transport parameters are not part of the user's destination.
    url.searchParams.delete("_rsc");
    return url.pathname + url.search + url.hash;
  } catch {
    return null;
  }
}

export function createAuthReturn(path: string, now = Date.now()): string | null {
  const destination = safeReturnPath(path);
  return destination
    ? JSON.stringify({
        path: destination,
        expiresAt: now + AUTH_RETURN_MAX_AGE * 1000,
      })
    : null;
}

export function readAuthReturn(value: string | undefined, now = Date.now()): string {
  if (!value) return DEFAULT_AUTH_DESTINATION;
  try {
    const saved = JSON.parse(value);
    if (
      typeof saved.expiresAt !== "number" ||
      !Number.isFinite(saved.expiresAt) ||
      saved.expiresAt <= now ||
      saved.expiresAt > now + AUTH_RETURN_MAX_AGE * 1000
    ) {
      return DEFAULT_AUTH_DESTINATION;
    }
    return safeReturnPath(saved.path) ?? DEFAULT_AUTH_DESTINATION;
  } catch {
    return DEFAULT_AUTH_DESTINATION;
  }
}
