"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { PinInput, pinSchema } from "@/lib/validators/WalletSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { setTransactionPin } from "@/lib/server/wallet";
// import useAxiosPrivate from '@/hooks/useAxiosPrivate';

type SetPinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SetPinDialog({
  open,
  onOpenChange,
}: SetPinDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const axiosPrivate = useAxiosPrivate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinInput>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  async function onSubmit(data: PinInput) {
    const { pin } = data;

    try {
      setIsSubmitting(true);
      const response = await setTransactionPin(data);
      if (!response?.success) {
        console.log(response);
        return toast.add({
          title: "Error",
          description: response?.message || "Failed to set PIN",
          type: "error",
        });
      }
      toast.add({
        title: "Success",
        description: response.message || "PIN set successfully",
        type: "success",
      });
      onOpenChange(false); // CLOSE DIALOG
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error?.message || "Failed to set PIN",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show validation errors as toasts to maintain previous behavior
  const onError = (errors: any) => {
    if (errors.pin) {
      toast.add({
        title: "Error",
        description: errors.pin.message as string,
        type: "error",
      });
    } else if (errors.confirmPin) {
      toast.add({
        title: "Error",
        description: errors.confirmPin.message as string,
        type: "error",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPopup className="mx-auto max-w-sm rounded-xl p-6">
        <h2 className="mb-2 text-xl font-bold">Create Transaction PIN</h2>
        <p className="mb-4 text-gray-600">Enter and confirm your 4-digit PIN</p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* CREATE PIN */}

          <div className="py-2">
            <Controller
              control={control}
              name="pin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mb-1 block text-sm font-medium">
                    Create PIN
                  </FieldLabel>
                  <InputOTP
                    type="password"
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                    containerClassName="justify-center gap-4"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={1}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={2}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* CONFIRM PIN */}

          <div className="py-2">
            <Controller
              control={control}
              name="confirmPin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="mt-4 mb-1 block text-sm font-medium">
                    Confirm PIN
                  </FieldLabel>
                  <InputOTP
                    type="password"
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                    containerClassName="justify-center gap-4"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={1}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={2}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        type="password"
                        className="h-12 w-12 text-2xl"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-12 w-full text-lg"
          >
            Set PIN
          </Button>
        </form>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
