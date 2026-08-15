import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function Page() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />;
    </Suspense>
  );
}
