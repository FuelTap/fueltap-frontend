import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  apiRequest,
  ApiRequestOptions,
  ApiResponse,
} from "./typedFetchWrapper";
import { refreshTokens } from "@/lib/server/auth";

/**
 * Wrapper around apiRequest that handles access token injection and silent 401 refresh retries.
 */
export async function authenticatedApiRequest<
  TRequest = unknown,
  TResponse = unknown,
>(
  endpoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: TRequest,
  options: ApiRequestOptions & { skipAuthRedirect?: boolean } = {},
): Promise<ApiResponse<TResponse>> {
  // Logout must finish clearing cookies even when the session has expired.
  const { skipAuthRedirect = false, ...requestOptions } = options;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("x-access-token")?.value;

  // Build outbound headers with available access token
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Cookie", `x-access-token=${accessToken}`);
  }

  // 1. Initial Attempt
  const { response, result } = await apiRequest<TRequest, TResponse>(
    endpoint,
    method,
    data,
    {
      ...requestOptions,
      headers,
    },
  );

  // 2. Handle 401 Unauthorized with single automatic retry
  if (response.status === 401 && !options.skipRefresh) {
    const refreshSuccessful = await refreshTokens();

    if (refreshSuccessful) {
      // Get updated cookie from Next.js store
      const updatedCookieStore = await cookies();
      const newAccessToken = updatedCookieStore.get("x-access-token")?.value;

      if (newAccessToken) {
        const retryHeaders = new Headers(options.headers);
        retryHeaders.set("Cookie", `x-access-token=${newAccessToken}`);

        // Retry request with fresh token
        const retry = await apiRequest<TRequest, TResponse>(
          endpoint,
          method,
          data,
          {
            ...requestOptions,
            headers: retryHeaders,
            skipRefresh: true, // Prevent secondary retries
          },
        );

        if (retry.response.status === 401 && !skipAuthRedirect) {
          redirect("/login");
        }
        return retry.result;
      }
    }
  }

  if (response.status === 401 && !skipAuthRedirect) {
    redirect("/login");
  }
  return result;
}
