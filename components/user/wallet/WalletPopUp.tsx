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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PinInput, pinSchema } from "@/lib/validators/WalletSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronLeft, Wallet } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const WalletPopup = ({ OnPay }: { OnPay: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinInput>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${buttonVariants({
          size: "full",
        })} rounded-[999px]! text-white max-sm:p-2 basis-1/2`}
      >
        Pay ₦12,350
      </AlertDialogTrigger>

      <AlertDialogPopup className="z-2000">
        <AlertDialogHeader className="mb-0!">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {}}
              aria-label="Back to order details"
              className="flex size-7 items-center justify-center rounded-full bg-neutra-500 md:size-10"
            >
              <ChevronLeft size={16} />
            </button>
            <AlertDialogTitle className="text-[30px] text-black">
              Confirm Payment
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-sm text-neutra-800 ">
            Pay with wallet
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-center">
          <h1 className="text-3xl font-semibold">₦22,150</h1>
          <p className="text-sm text-neutra-800">
            Balance after payment: ₦23,200
          </p>
        </div>

        <form action="">
          <Controller
            control={control}
            name="pin"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputOTP
                  type="password"
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS}
                  {...field}
                  containerClassName="justify-center "
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
          <AlertDialogFooter>
            {/* IMPORTANT: use Button, not AlertDialogAction */}
            <Button
              size={"full"}
              className=" text-white mt-5"
              onClick={() => {
                console.log("pay");
                OnPay();
              }}
            >
              Confirm ₦12,350
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogPopup>
    </AlertDialog>
  );
};

export default WalletPopup;
