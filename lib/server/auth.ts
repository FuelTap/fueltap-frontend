"use server";

import {
  changePasswordSchema,
  ChangePasswordSchemaInput,
  LoginInput,
} from "../validators/authSchema";
import setCookieParser from "set-cookie-parser";
import { cookies } from "next/headers";
import { apiRequest } from "../helpers/fetch/typedFetchWrapper";
import { syncBackendCookies } from "../helpers/auth-cookies";
import { authenticatedApiRequest } from "../helpers/fetch/authenticatedApiRequest";
import { redirect } from "next/navigation";
import { User } from "@/context/AuthProvider";
// =======================REGISTER===============================
export async function Register(data: {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "failed to register",
      };
    }
    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server-side error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

// =======================OTP===============================
export async function verifyOtpAction(data: { email: string; otp: string }) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/account-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "failed to verify otp",
      };
    }
    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server-side error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

// =======================LOGIN===============================
export async function loginAction(credentials: LoginInput) {
  const { response, result } = await apiRequest(
    "/api/v1/auth/login",
    "POST",
    credentials,
    {
      skipRefresh: true,
    },
  );

  if (!result.success) {
    console.log(result);
    return result;
  }
  await syncBackendCookies(response);
  // return result;
  redirect("/user/dashboard");
}

// ============================================LOGOUT=========================================

export async function logoutAction(userId: string) {
  try {
    await authenticatedApiRequest("api/v1/auth/logout", "POST", { userId });
  } catch (error) {
    return { success: false, error: "Backend request failed" };
  }

  const cookieStore = await cookies();
  cookieStore.delete("x-access-token");
  cookieStore.delete("x-refresh-token");

  return { success: true };
}

// ==========================================Get User===========================================

export async function getUserProfile() {
  return await authenticatedApiRequest<void, { user: User }>(
    "/api/v1/auth/user",
    "GET",
  );
}

// ==========================================FORGOT PASSWORD===========================================

export async function forgotPassword(data: { email: string }) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "something went wrong",
      };
    }
    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Server-side error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function resetPassword(data: {
  email: string;
  token: string;
  new_password: string;
  confirm_password: string;
}) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "something went wrong",
      };
    }
    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server-side error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

// ==========================================CHANGE/UPDATE PASSWORD===========================================

export async function changePassword(payload: ChangePasswordSchemaInput) {
  const vaildate = changePasswordSchema.safeParse(payload);

  if (!vaildate.success) {
    console.log(vaildate.error?.message);
    return {
      success: false,
      message: "failed to validate user password details",
      error: vaildate.error?.message || "Invalid password",
    };
  }

  return await authenticatedApiRequest<
    ChangePasswordSchemaInput,
    {
      status: string;
      message: string;
    }
  >("/api/v1/auth/change-password", "PATCH", vaildate.data);
}

// ========================================== DELETE ACCOUNT===========================================

export async function deleteAccount() {
  // const valdiate = deleteAccountSchema.safeParse(payload);

  // if (!valdiate.success) {
  //   console.log(valdiate.error?.message);
  //   return {
  //     success: false,
  //     message: "failed to validate user account details",
  //     error: valdiate.error?.message || "Invalid account details",
  //   };
  // }

  return await authenticatedApiRequest<
    void,
    {
      status: string;
      message: string;
    }
  >("/api/v1/auth/delete-account", "DELETE");
}

// ==========================================UPDATE COOKIES===========================================

async function updateAuthCookies(response: Response) {
  const rawCookies = response.headers.getSetCookie();

  const parsedCookies = setCookieParser.parse(rawCookies);

  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    if (cookie.name !== "x-access-token" && cookie.name !== "x-refresh-token") {
      continue;
    }

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

export async function refreshTokens(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("x-refresh-token")?.value;

  if (!refreshToken) {
    return false;
  }

  const { response, result } = await apiRequest(
    "api/v1/auth/refresh-token",
    "POST",
    undefined,
    {
      headers: {
        Cookie: `x-refresh-token=${refreshToken}`,
      },
      skipRefresh: true,
    },
  );

  if (response.ok && result.success) {
    await syncBackendCookies(response);
    return true;
  }

  return false;
}
