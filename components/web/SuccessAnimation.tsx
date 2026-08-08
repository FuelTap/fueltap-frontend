"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnim from "@/public/assets/animations/success.json";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogPopup,
} from "../animate-ui/components/base/alert-dialog";

export default function SuccessAnimation({
  time = 3000,
  link = "/role-selector",
  info = "  Registration successful!",
}) {
  const router = useRouter();

  const { isSmallScreen } = useScreenSize(768);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSmallScreen) {
      setOpen(true);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(link);
    }, time);
    return () => clearTimeout(timeout);
  }, [router, link, time]);

  // Small screens → inline display
  if (isSmallScreen) {
    return (
      <div className="bg-primary-900 fixed bottom-0 left-0 flex h-[87%] w-screen flex-col items-center justify-center rounded-t-2xl text-center md:static md:h-87.25 md:w-81.25 md:rounded-b-2xl">
        <Lottie
          animationData={successAnim}
          loop={false}
          className="h-40 w-40"
        />
        <h2 className="mt-4 text-lg font-semibold text-green-700">{info}</h2>
        <p className="text-gray-500">Redirecting shortly...</p>
      </div>
    );
  }

  // ✅ Medium & large screens → dialog modal
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogPopup className="bg-primary-900 focus:outline-none  border-0! text-center text-white md:rounded-2xl">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <Lottie
            animationData={successAnim}
            loop={false}
            className="h-40 w-40"
          />
          <AlertDialogHeader className="mt-4 text-lg font-semibold text-green-700">
            {info}
          </AlertDialogHeader>

          <p className="text-white">Redirecting shortly...</p>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
