import VerifyEmail from "@/components/auth/VerifyEmail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify Email",
};
export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
