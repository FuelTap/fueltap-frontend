export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  status: string;
  data?: T;
  error?: string;
};

export type ApiRequestOptions = RequestInit & {
  /**
   * If true, suppresses automatic retry on 401.
   * Useful to prevent infinite loops on endpoints like /auth/refresh-token itself.
   */
  skipRefresh?: boolean;
};

export async function apiRequest<TRequest = unknown, TResponse = unknown>(
  endpoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: TRequest,
  options: ApiRequestOptions = {},
): Promise<{ response: Response; result: ApiResponse<TResponse> }> {
  const { skipRefresh, headers: customHeaders, ...restOptions } = options;

  const url = `${process.env.API_URL}/${endpoint.replace(/^\//, "")}`;

  const headers = new Headers(customHeaders);
  if (data && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      cache: "no-store",
      ...restOptions,
    });

    // Safely attempt to parse JSON
    let result: ApiResponse<TResponse>;
    try {
      const parsed = await response.json();
      result = response.ok
        ? {
            success: true,
            status: parsed.status || "success",
            message: parsed.message || "Request successful",
            data: parsed.data !== undefined ? parsed.data : parsed,
          }
        : {
            success: false,
            status: parsed.status || "error",
            message: parsed.message || "Something went wrong",
          };
    } catch {
      result = {
        success: response.ok,
        status: response.ok ? "success" : "error",
        message: response.statusText || "Unexpected response body",
      };
    }

    return { response, result };
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return {
      response: new Response(null, { status: 500 }),
      result: {
        success: false,
        status: "error",
        message:
          error instanceof Error ? error.message : "Network error occurred",
      },
    };
  }
}
