"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const indicatorMap: Record<
  string,
  { progressValue: number; text: string; title: string }
> = {
  "/register": {
    progressValue: 40,
    text: "Already using FuelTap?",
    title: "Create an Account",
  },
  "/confirm-password": {
    progressValue: 60,
    text: "Secure your account",
    title: "Create a Password",
  },
  "/verify-email": {
    progressValue: 90,
    title: "Verify your email",
    text: "Enter the OTP sent to your email",
  },
  "/role-selector": {
    progressValue: 10,
    text: "Click to select",
    title: "Select Role",
  },
  "/login": {
    progressValue: 50,
    text: "Don't have an account?",
    title: "Login to Continue",
  },
  "/forgot-password": {
    progressValue: 50,
    text: "Enter the email associated with your account, and we will email you a reset password link.",
    title: "Forgot Password?",
  },
  "/reset-password": {
    progressValue: 90,
    text: "Please do not reuse an old password",
    title: "Enter New Password",
  },
};

export default function OnboardingShell() {
  const pathname = usePathname();
  const indicatorData = indicatorMap[pathname];
  return (
    <div>
      {indicatorData && (
        <Indicator
          progressValue={indicatorData.progressValue}
          text={indicatorData.text}
          title={indicatorData.title}
        />
      )}
    </div>
  );
}

function Indicator({
  progressValue,
  title,
  text,
}: {
  progressValue: number;
  title: string;
  text: string;
}) {
  const router = useRouter();
  return (
    <div className="mt-6 mb-4 flex flex-col lg:mt-0 lg:items-center">
      <div className="flex items-center gap-4 rounded-2xl">
        <ChevronLeft
          size={32}
          className={"bg-gray-100 sm:hidden"}
          onClick={() => router.back()}
        />
        <div>
          <h1 className="text-primary font-pjs text-2xl font-semi">{title}</h1>
          <div className="mt-1 mb-4 flex items-center gap-1 lg:mt-2 lg:mb-6">
            <p className="text-lg-regular text-grey-600">{text}</p>
            {text === "Already using FuelTap?" && (
              <Link className="text-primary" href={"/login"}>
                Sign in
              </Link>
            )}
            {text === "Don't have an account?" && (
              <Link className="text-primary" href={"/role-selector"}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* <Progress value={progressValue} /> */}
    </div>
  );
}
