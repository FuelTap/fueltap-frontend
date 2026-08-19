"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";

import { Input } from "@/components/ui/input";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  bankAccountSchema,
  BankAccountSchemaInput,
} from "@/lib/validators/WalletSchema";
import { X } from "lucide-react";
import { handleNumericInput, preventInvalidKeys } from "@/lib/utils";
import bankData from "@/public/banks.json";
import { SearchableSelect } from "@/components/web/SearchableSelect";
import { addBankAccount, verifyBankDetails } from "@/lib/server/wallet";
import { toast } from "@/components/ui/toast";

const LinkBank = ({ onClose }: { onClose: () => void }) => {
  const form = useForm({
    resolver: zodResolver(bankAccountSchema),
  });

  // code to check when bankname and number has been selected and fetch account name

  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const bankName = form.watch("bankName");
  const accountNumber = form.watch("accountNumber");
  useEffect(() => {
    async function fetchAccountName() {
      if (bankName && accountNumber?.length === 10) {
        setIsResolving(true);
      }
      try {
        const res = await verifyBankDetails(bankName, accountNumber);
        if (!res.success) {
          return toast.add({
            title: "Error",
            description:
              res.message || "Something went wrong, please try again later.",
          });
        }
        const fetchedName = res.data.data?.account_name;
        form.setValue("accountName", fetchedName);
        setResolved(true);
      } catch (error: any) {
        toast.add({
          title: "Error",
          description:
            error.message || "Something went wrong, please try again later.",
        });
        setResolved(false);
      } finally {
        setIsResolving(false);
      }
    }

    if (bankName && accountNumber?.length === 10) fetchAccountName();
  }, [bankName, accountNumber, form]);

  const onSubmit = async (payload: BankAccountSchemaInput) => {
    try {
      const res = await addBankAccount(payload);
      if (!res.success) {
        return toast.add({
          title: "Error",
          description:
            res.message || "Something went wrong, please try again later.",
        });
      }
      toast.add({
        title: "Success",
        description: "Bank account added successfully",
      });
      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.data.message ||
        error.message ||
        "Failed to add bank account. Please try again later.";
      toast.add({ title: "Error", description: message });
    }
  };

  const { isSmallScreen } = useScreenSize(500);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) onClose();
  }, [open, onClose]);

  const allBankNames = bankData.map((bankObject) => bankObject.name);

  // 🧠 Shared form layout (used for both mobile + desktop)
  const formContent = (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col space-y-6"
      id="link-bank-form"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="bankName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bankName" className="text-lg-medium">
                Bank Name
              </FieldLabel>

              <SearchableSelect
                items={allBankNames}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select your bank"
              />

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="accountNumber" className="text-lg-medium">
                Account Number
              </FieldLabel>

              <Input
                type="text"
                placeholder="Enter your 10 digit number"
                {...field}
                onChange={(e) => handleNumericInput(e, field, 10)}
                onKeyDown={preventInvalidKeys}
              />

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="accountName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="accountName" className="text-lg-medium">
                Account Name
              </FieldLabel>

              <Input
                type="text"
                placeholder={
                  isResolving ? "Verifying..." : "Account name will appear here"
                }
                {...field}
                disabled
              />

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button size="full" type="submit" disabled={!resolved || isResolving}>
          {isResolving ? "Verifying..." : "Continue"}
        </Button>
      </FieldGroup>
    </form>
  );

  // 🧱 Render different containers for small and large screens
  if (isSmallScreen) {
    return (
      <div
        className={`fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-500 ease-in-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed bottom-0 left-0 flex min-h-100 w-screen transform flex-col justify-between space-y-6 rounded-t-4xl bg-white p-4 text-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h5 className="text-primary">Link Bank Account</h5>
            <X onClick={onClose} className="cursor-pointer text-sm" />
          </div>

          {formContent}
        </div>
      </div>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogPopup className="w-147 text-center md:rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h5 className="text-primary">Link Bank Account</h5>
              <small className="text-sm font-light">Select your bank</small>
            </div>
            <X onClick={onClose} className="cursor-pointer text-sm" />
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4">
            {formContent}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogPopup>
    </AlertDialog>
  );
};

export default LinkBank;
