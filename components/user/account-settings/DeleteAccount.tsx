"use client";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import { deleteAccount } from "@/lib/server/auth";
import { CircleAlert, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthProvider";

const DeleteAccount = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletingRef = useRef(false);

  async function handleDelete() {
    if (deletingRef.current) return;
    deletingRef.current = true;
    setIsDeleting(true);
    const toastId = toast.add({
      type: "loading",
      title: "Deleting account…",
      description: "Please wait while we delete your account.",
      timeout: 0,
    });

    try {
      const result = await deleteAccount();

      console.log("result: ", result);
      if (!result.success) {
        throw new Error(
          result.message || "Could not delete your account. Please try again.",
        );
      }
      toast.update(toastId, {
        type: "success",
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
        timeout: 5000,
      });
      setUser(null);
      router.replace("/login");
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        title: "Account deletion failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not delete your account. Please try again.",
        timeout: 7000,
        priority: "high",
      });
      deletingRef.current = false;
      setIsDeleting(false);
    }
  }

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
        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-busy={isDeleting}
          className="bg-error text-white hover:bg-error/90"
        >
          {isDeleting && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
          {isDeleting ? "Deleting…" : "Delete account"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
