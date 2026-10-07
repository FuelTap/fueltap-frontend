"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import KycInfo from "./KycInfo";

import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/base/alert-dialog";
import DeleteAccount from "./DeleteAccount";
import ProfileForm from "./ProfileForm";
import { LogOut, Trash } from "lucide-react";
import LogoutModal from "./LogoutModal";

const ProfileSettings = () => {
  return (
    <>
      <ProfileForm />
      <KycInfo />

      {/* delete my account */}

      <div className="border-gray-100 bg-[#FDFDFE]  rounded-2xl border-[0.5px] p-8 flex flex-wrap gap-4 justify-between items-center ">
        <div className="space-y-0.5">
          <h4 className="text-sm md:text-base font-medium">
            Delete My Account
          </h4>
          <p className="text-sm text-grey-800 md:text-base">
            Permanently delete your account and all data. This actions cannot be
            undone after successful deletion
          </p>
        </div>
        <div className="">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className={"bg-error hover:bg-error text-white"}>
                  <Trash />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogPopup>
                <DeleteAccount />
              </AlertDialogPopup>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <LogoutModal>
          <Button
            className={`rounded-[999px] md:hidden border-primary inline-flex text-primary hover:text-white w-screen! border  hover:bg-destructive items-center gap-2 ${buttonVariants(
              { size: "full", variant: "outline" },
            )}`}
          >
            <LogOut /> <span>Log Out</span>{" "}
          </Button>
        </LogoutModal>
      </div>
    </>
  );
};

export default ProfileSettings;
