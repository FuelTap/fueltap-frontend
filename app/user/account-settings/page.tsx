"use client";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/base/alert-dialog";
import { useState } from "react";
import { Clock, Clock3, Key, Shield, Trash } from "lucide-react";
import AccountHeader from "@/components/user/account-settings/AccountHeader";
import ProfileSettings from "@/components/user/account-settings/ProfileSettings";
import ChangePassword from "@/components/user/account-settings/ChangePassword";
import SetPinDialog from "@/components/user/wallet/SetPinDialog";
import DeleteAccount from "@/components/user/account-settings/DeleteAccount";
const AccountSettings = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPinDialog, setOpenPinDialog] = useState(false);

  return (
    <div>
      <AccountHeader />

      <ProfileSettings />

      {/* setting options for mobiles */}
      <div className="lg:hidden">
        <Accordion>
          {[
            {
              icon: <Clock3 />,
              title: "Change  Password",
              jsx: <ChangePassword onCancel={() => {}} />,
            },
            {
              icon: <Clock3 />,
              title: "Add Transaction Pin",
              jsx: (
                <SetPinDialog
                  open={openPinDialog}
                  onOpenChange={setOpenPinDialog}
                />
              ),
            },
          ].map(({ title, icon, jsx }, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index + 1}
              className={"last:border-b"}
            >
              <AccordionTrigger className={""}>
                <div
                  className={
                    "text-md-medium text-grey-800! flex items-center gap-2"
                  }
                >
                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    {icon}
                  </span>
                  {title}
                </div>
              </AccordionTrigger>
              <AccordionPanel className={"text-md-medium text-neutra-1000"}>
                {jsx}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex items-center gap-2 py-4">
          <span
            className={
              "flex h-8 w-8 items-center justify-center rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400"
            }
          >
            <Trash />
          </span>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className={"bg-error hover:bg-error text-white"}>
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogPopup>
              <DeleteAccount />
            </AlertDialogPopup>
          </AlertDialog>
        </div>
      </div>

      {/* <span
                className={
                  'flex h-12 w-12 items-center justify-center rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400'
                }
              >
                <RiDeleteBin5Line />
              </span> */}

      <div className="hidden flex-col justify-between md:flex-row lg:flex">
        <div className="basis-full p-8 md:basis-[49%]">
          <div className="mb-6 space-y-0.5">
            <h4 className="title">Security Settings</h4>
            <p className="text-lg-regular text-lg text-gray-800">
              Manage your password, PIN, and security preferences
            </p>
            <div className="mt-4 flex flex-col gap-8 p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    <Clock />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Change Password
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogTrigger>
                    <Button
                      className={"bg-transparent text-black hover:text-white"}
                    >
                      Change
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogPopup>
                    <ChangePassword onCancel={() => setOpenDialog(false)} />
                  </AlertDialogPopup>
                </AlertDialog>
              </div>
              {/* 2 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    <Key />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Add Transaction PIN
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Set up a 4-digit PIN for secure transactions
                    </p>
                  </div>
                </div>
                <Button onClick={() => setOpenPinDialog(true)}>Set PIN</Button>
                <SetPinDialog
                  open={openPinDialog}
                  onOpenChange={setOpenPinDialog}
                />
              </div>

              {/* 3 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    <Shield />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      2-Factor Authentication
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* preference */}
        <div className="basis-full p-8 md:basis-[49%]">
          <div className="mb-6 space-y-0.5">
            <h4 className="title">Preferences</h4>
            <p className="text-lg-regular text-lg text-gray-800">
              Customize your app experience and notifications
            </p>
            <div className="mt-4 flex flex-col gap-8 p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    <Clock />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Push Notifications
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Receive notifications about orders
                    </p>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              {/* 2 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400"
                    }
                  >
                    <Key />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Language
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
                <Button
                  className={"bg-transparent text-black hover:text-white"}
                >
                  English
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* delete my account */}

      <div className="border-error/40 mt-12 hidden rounded-xl border-[0.1px] p-8 lg:block">
        <div className="mb-6 space-y-0.5">
          <h4 className="title">Delete My Account</h4>
          <p className="text-lg-regular text-lg text-gray-800">
            Permanent actions that cannot be undone
          </p>
          <div className="mt-4 flex flex-col gap-8 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span
                  className={
                    "rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400"
                  }
                >
                  <Trash />
                </span>
                <div>
                  <h5 className="text-md-medium text-xl text-black!">
                    Delete Account
                  </h5>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className={"bg-error hover:bg-error text-white"}>
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
      </div>
    </div>
  );
};

export default AccountSettings;
