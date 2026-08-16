"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import { deleteAccount } from "@/lib/server/auth";
import { CircleAlert } from "lucide-react";

const DeleteAccount = () => {
  return (
    <div className="p-3">
      <div className="mb-6 space-y-4 text-center">
        <CircleAlert className="text-error mx-auto h-14 w-14" />
        <AlertDialogTitle>Delete Account</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </div>
      <div>
        <h6>The following will be permanently deleted:</h6>
        <ul className="list-disc">
          <li>Your profile and personal information</li>
          <li>All transaction history and order records</li>
          <li>
            Financial records will be retained only for compliance purposes.
          </li>
          <li>All saved preferences and settings</li>
        </ul>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            deleteAccount();
          }}
          className={"bg-error hover:bg-error"}
        >
          Continue
        </AlertDialogAction>
      </div>
    </div>
  );
};

export default DeleteAccount;
