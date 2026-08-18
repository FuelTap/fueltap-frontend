"use server";

import { cookies } from "next/headers";

export async function refreshTokens() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("x-refresh-token")?.value;

  if (!refreshToken) {
    return false;
  }

  const response = await fetch(
    `${process.env.API_URL}/api/v1/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `x-refresh-token=${refreshToken}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return false;
  }

  // We'll handle the backend's new Set-Cookie
  // headers here.

  return true;
}
