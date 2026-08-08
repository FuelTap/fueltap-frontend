import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function Page() {
  return <RegisterForm />;
}
