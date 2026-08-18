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
import { toast } from "../ui/toast";
import z from "zod";
import { forgotPassword } from "@/lib/server/auth";

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
    try {
      console.log("I was called");
      setIsSubmitting(true);
      const response = await forgotPassword(data);

      const { success, message } = response;
      if (success) {
        toast.add({
          title: "Success",
          description: message,
          type: "success",
        });
        setEmail(data.email);
        setShowPopup(true);
      }
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        toast.add({
          description: error.message,
          type: "error",
        });
      } else {
        toast.add({
          description: error.response.data.message || "Something went wrong",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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

      {showPopup && (
        <InfoPopup
          onClose={() => setShowPopup(false)}
          email={email}
          resend={() => {
            onSubmit({ email });
          }}
        />
      )}
    </>
  );
};

export default ForgotPassword;
