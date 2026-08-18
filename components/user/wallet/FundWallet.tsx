"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./FundWallet.css";
import { amountSchema, AmountSchemaInput } from "@/lib/validators/WalletSchema";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import SetPinDialog from "./SetPinDialog";
import { initializeAddFundToWallet } from "@/lib/server/wallet";
import { toast } from "@/components/ui/toast";

interface FundWalletProp {
  onClose: () => void;
}

const FundWallet = ({ onClose }: FundWalletProp) => {
  const [openPinDialog, setOpenPinDialog] = useState(false);

  // 1. Define your form.
  const form = useForm<AmountSchemaInput>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: 0,
    },
  });
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(data: AmountSchemaInput) {
    try {
      setIsSubmitting(true);
      const response = await initializeAddFundToWallet(data.amount);
      console.log(response);

      if (!response.success) {
        if (
          response.message ===
          "Wallet not found, Kindly set your transaction pin to create a wallet"
        ) {
          toast.add({
            description: response.message,
          });
          return setOpenPinDialog(true);
        } else {
          toast.add({
            type: "error",
            description: response.message || "Failed to initialize funding.",
          });
        }
      }

      if (response.status === "success") {
        toast.add({
          type: "success",
          description: response.message,
        });
        // const { authorization_url, access_code, referecne } = response?.data;
        // window.location.href = authorization_url;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.add({
          type: "error",
          description:
            error.message || "An unexpected error occurred. Please try again.",
        });
      } else
        toast.add({
          type: "error",
          description: "An unexpected error occurred. Please try again.",
        });
    } finally {
      setIsSubmitting(false);
    }
    onClose();
  }
  const { isSmallScreen } = useScreenSize(500);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  if (isSmallScreen) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed bottom-0 left-0 flex min-h-83 w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <h5 className="text-primary">Fund Your Wallet</h5>
              <X onClick={onClose} className="cursor-pointer text-sm" />
            </div>

            <FundWalletForm
              isSubmitting={isSubmitting}
              form={form}
              onSubmit={onSubmit}
            />
          </div>
        </div>
        <SetPinDialog open={openPinDialog} onOpenChange={setOpenPinDialog} />
      </>
    );
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogPopup className="w-120 text-center md:rounded-xl">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="text-primary">
                Fund Your Wallet
              </AlertDialogTitle>
              <div className="flex items-center gap-2">
                <X onClick={onClose} className="cursor-pointer text-sm" />
              </div>
            </div>

            <AlertDialogDescription className="mt-8">
              <FundWalletForm
                isSubmitting={isSubmitting}
                form={form}
                onSubmit={onSubmit}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogPopup>
      </AlertDialog>
      <SetPinDialog open={openPinDialog} onOpenChange={setOpenPinDialog} />
    </>
  );
};

export default FundWallet;

function FundWalletForm({
  form,
  onSubmit,
  isSubmitting,
}: {
  form: UseFormReturn<AmountSchemaInput>;
  onSubmit: (data: AmountSchemaInput) => void;
  isSubmitting: boolean;
}) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col space-y-6"
      id="amount-form-sm"
    >
      <FieldGroup>
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">Amount (₦)</FieldLabel>
              <Input
                type={"number"}
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="no-spinner"
              />
              <small className="text-green-500">+20% charge</small>
              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button
          disabled={isSubmitting}
          variant={"secondary"}
          className={"text-white"}
          size={"full"}
          type="submit"
        >
          Continue
        </Button>
      </FieldGroup>
    </form>
  );
}
