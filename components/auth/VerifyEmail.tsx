"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { type otpInput, otpSchema } from "@/lib/validators/authSchema";
import SuccessAnimation from "../web/SuccessAnimation";

interface ErrorWithMessage {
  message: string;
}

const VerifyEmail = () => {
  const form = useForm<otpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [showSuccess, setShowSuccess] = useState(false);
  const currentOtp = form.watch("otp") || "";

  const onSubmit = async (data: otpInput) => {
    console.log("data: ", data);
    setShowSuccess(true);

    // startTransition(async () => {
    //   const payload = {
    //     email: "user@example.com", // Pull from context/state/params as needed
    //     otp: data.otp,
    //   };
    //   try {
    //     const otpResponse = await axiosInstance.post(
    //       'v1/auth/account-verification',
    //       payload
    //     );
    //     const { message } = otpResponse.data;
    //     toast.success(message);
    //     router.push('/success');
    //   } catch (error) {
    //     const err = error as ErrorWithMessage;
    //     toast.error(err.message || "Verification failed");
    //     console.error(err);
    //   }
    // });
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[70vh] flex-col space-y-4"
        id="otp-fields"
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Enter OTP</FieldLabel>

                <InputOTP maxLength={6} {...field} className="w-full">
                  <InputOTPGroup className="flex w-full justify-between">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 flex-1" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {fieldState.invalid && fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
            <Button
              type="submit"
              size="full"
              variant="secondary"
              className="text-md-medium"
              disabled={currentOtp.length !== 6 || isPending}
            >
              {isPending ? "Authenticating..." : "Verify"}
            </Button>
          </div>
        </FieldGroup>
      </form>
      {showSuccess && <SuccessAnimation />}
    </>
  );
};

export default VerifyEmail;
