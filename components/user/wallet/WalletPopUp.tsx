"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/base/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const WalletPopup = ({ OnPay }: { OnPay: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${buttonVariants({
          size: "full",
          variant: "secondary",
        })} text-white`}
      >
        Pay
      </AlertDialogTrigger>

      <AlertDialogPopup className="z-2000">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[30px] text-black">
            Pay from Wallet
          </AlertDialogTitle>

          <AlertDialogDescription className="text-lg-regular text-neutra-800">
            The corresponding amount will be deducted from your wallet.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <section className="bg-primary rounded-[8px] px-4 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Available Balance</p>
              <p className="text-3xl font-semibold">₦20,000</p>
            </div>
            <Wallet size={24} aria-hidden="true" />
          </div>
        </section>

        <section className="mt-4 space-y-2">
          <dl className="rounded border">
            <div className="border-error flex items-center justify-between rounded-xl border p-3">
              <dt className="text-sm">Deduct</dt>
              <dd className="text-error text-lg font-semibold">₦12,350</dd>
            </div>

            <div className="mt-2 flex items-center justify-between p-3">
              <dt className="text-sm">Remaining Balance</dt>
              <dd className="text-lg font-semibold">₦7,650</dd>
            </div>
          </dl>
        </section>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {/* IMPORTANT: use Button, not AlertDialogAction */}
          <Button
            className="rounded-2xl bg-black text-white"
            onClick={() => {
              console.log("pay");
              OnPay();
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
};

export default WalletPopup;
