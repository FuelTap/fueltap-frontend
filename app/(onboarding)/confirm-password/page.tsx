import ConfirmPassword from "@/components/auth/ConfirmPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set your password",
};
export default function Page() {
  return <ConfirmPassword />;
}
