"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPopup,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/base/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";

import warningAnimation from "@/public/assets/animations/warning.json";
import Lottie from "lottie-react";
import { ReactNode } from "react";

const LogoutModal = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogPopup className="mx-auto max-w-sm  w-82.5 p-4 md:w-100 flex flex-col items-center justify-center text-center space-y-3 rounded-2xl shadow">
        <Lottie
          animationData={warningAnimation}
          loop={false}
          className="size-15 lg:size-25"
        />

        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-semibold">
            Ready to log out?
          </h1>
          <p className="text-sm md:text-base text-grey-800">
            You'll be signed out of your account until you sign in again.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <AlertDialogCancel
            className={`${buttonVariants({ variant: "outline", size: "full" })} text-primary border-primary outline-primary p-2!  basis-1/2`}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => logout()}
            className={`${buttonVariants({ size: "full" })} basis-1/2 p-2!  `}
          >
            Yes, Log Out
          </AlertDialogAction>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
};

export default LogoutModal;
