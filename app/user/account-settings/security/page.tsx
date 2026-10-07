"use client";
import { Clock, Key } from "lucide-react";

import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/base/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChangePassword from "@/components/user/account-settings/ChangePassword";
import SetPinDialog from "@/components/user/wallet/SetPinDialog";
import SuccessModalFunction from "@/components/user/SuccessModalFunction";
const SecurityPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [passUpdate, setPassUpdate] = useState(false);

  const [openPinDialog, setOpenPinDialog] = useState(false);
  const [pinUpdate, setPinUpdate] = useState(false);
  return (
    <section>
      <div className=" flex-col justify-between  flex">
        <div className="basis-full p-3  md:p-8 rounded-2xl border border-grey-200 bg-[#FDFDFE] mb-2 md:mb-4">
          <div className="mb-6 space-y-0.5">
            <h4 className="text-sm md:text-lg font-semibold">
              Security Settings
            </h4>
            <p className="text-sm md:text-lg text-grey-800">
              Manage your password, PIN, and security preferences
            </p>

            <div className="mt-4 flex flex-col gap-8 p-2 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 md:gap-3">
                  <span
                    className={
                      "rounded-full bg-green-50 shrink-0 size-8 md:size-10 items-center justify-center text-green-400 flex"
                    }
                  >
                    <Clock size={20} />
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-medium! text-sm md:text-base lg:text-xl">
                      Change Password
                    </h5>
                    <p className="text-xs font-medium md:text-base text-grey-800">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogTrigger>
                    <Button
                      className={
                        "bg-transparent text-primary rounded-[999px] hover:text-white"
                      }
                    >
                      Change
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogPopup className={"rounded-2xl"}>
                    <ChangePassword
                      setPassUpdate={setPassUpdate}
                      onCancel={() => setOpenDialog(false)}
                    />
                  </AlertDialogPopup>
                </AlertDialog>

                {passUpdate && (
                  <SuccessModalFunction
                    text={
                      "Your password has been updated successfully. You'll be logged out to sign in with your new password."
                    }
                    title={"Password Updated"}
                    onClick={() => setPassUpdate(false)}
                  />
                )}
              </div>

              {/* 2. add transaction pin */}

              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-1.5 md:gap-3">
                  <span
                    className={
                      "rounded-full bg-green-50 shrink-0 size-8 md:size-10 items-center justify-center text-green-400 flex"
                    }
                  >
                    <Key size={20} />
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-medium! text-sm md:text-base lg:text-xl">
                      Add Transaction PIN
                    </h5>
                    <p className="text-xs font-medium md:text-base text-grey-800">
                      Set up a 4-digit PIN for secure transactions
                    </p>
                  </div>
                </div>
                <Button
                  className={
                    "bg-transparent text-primary rounded-[999px] hover:text-white"
                  }
                  onClick={() => setOpenPinDialog(true)}
                >
                  Change
                </Button>
                <SetPinDialog
                  open={openPinDialog}
                  onOpenChange={setOpenPinDialog}
                  setPinUpdate={setPinUpdate}
                />
                {pinUpdate && (
                  <SuccessModalFunction
                    text={"Your transaction pin has been updated successfully"}
                    title={"Pin Updated!"}
                    onClick={() => setPinUpdate(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPage;
