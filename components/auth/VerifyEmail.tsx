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
import { toast } from "../ui/toast";
import { verifyOtpAction } from "@/lib/server/auth";

const VerifyEmail = () => {
  const form = useForm<otpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const [successMessage, setSuccessMessage] = useState("");
  const currentOtp = form.watch("otp") || "";

  const { push } = useRouter();

  const onSubmit = async (data: otpInput) => {
    startTransition(async () => {
      try {
        const registration_data = JSON.parse(
          localStorage.getItem("registration_flow") || "{}",
        );
        if (!registration_data?.email) {
          push("/register");
          return;
        }
        const { message, success } = await verifyOtpAction({
          email: registration_data.email,
          otp: data.otp,
        });
        if (!success) {
          console.error("Email verification failed:", message);
          toast.add({
            title: "Verification failed",
            description: message,
            type: "error",
          });
          return;
        }
        localStorage.removeItem("registration_flow");
        setSuccessMessage(message);
        toast.add({ title: "Success", description: message, type: "success" });
      } catch (error) {
        console.error("Email verification failed:", error);
        toast.add({
          title: "Verification failed",
          description: "Unable to verify your email. Please try again.",
          type: "error",
        });
      }
    });
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
      {successMessage && <SuccessAnimation link="/login" info={successMessage} />}
    </>
  );
};

export default VerifyEmail;
