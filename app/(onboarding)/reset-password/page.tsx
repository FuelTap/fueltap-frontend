import ResetPassword from "@/components/auth/ResetPassword";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-sm text-gray-500">Loading form...</div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
