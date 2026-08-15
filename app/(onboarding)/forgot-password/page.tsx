import ForgotPassword from "@/components/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "forgot password",
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
