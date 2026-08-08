"use client";
import InfoPopup from "@/components/auth/InfoPopUp";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
// import InfoPopup from './InfoPopup';
// import { axiosInstance } from '@/api/axios';

const schema = z.object({
  email: z
    .string({
      message: "field can not be empty!.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  async function onSubmit(data: { email: string }) {
    console.log(data);
    // try {
    //   setIsSubmitting(true);
    //   const response = await axiosInstance.post(
    //     "v1/auth/forgot-password",
    //     data,
    //   );

    //   const { status, message } = response.data;
    //   if (status === "success") {
    //     console.log(response.data);
    //     toast.success(message);
    //     setEmail(data.email);
    //     setShowPopup(true);
    //   }
    // } catch (error) {
    //   toast.error(error?.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
  }
  return (
    <>
      <form
        id="forgot-password-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[65vh] flex-col space-y-6"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className={"text-lg-medium"}>
                Email Address
              </FieldLabel>
              <Input placeholder="fueltap@support.com" {...field} />

              <FieldError />
            </Field>
          )}
        />

        <div className="mb-4 justify-self-start max-sm:mt-auto">
          <Button
            type="submit"
            variant={"secondary"}
            size={"full"}
            className={"text-md-medium"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send email"}
          </Button>
        </div>
      </form>

      {true && (
        <InfoPopup
          onClose={() => setShowPopup(false)}
          email={email}
          resend={() => onSubmit({ email })}
        />
      )}
    </>
  );
};

export default ForgotPassword;
