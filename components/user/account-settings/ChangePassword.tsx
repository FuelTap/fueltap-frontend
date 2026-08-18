"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import {
  changePasswordSchema,
  ChangePasswordSchemaInput,
} from "@/lib/validators/authSchema";
import { toast } from "@/components/ui/toast";
import { changePassword } from "@/lib/server/auth";

interface ChangePasswordProps {
  onCancel: () => void;
}

const ChangePassword = ({ onCancel }: ChangePasswordProps) => {
  const form = useForm<ChangePasswordSchemaInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {},
  });

  const [isPending, startTransition] = useTransition();
  async function onSubmit(payload: ChangePasswordSchemaInput) {
    startTransition(async () => {
      try {
        const res = await changePassword(payload);
        console.log(res);
        if (!res.success) {
          toast.add({
            type: "error",
            description: res.message || "Something went wrong",
          });
        } else {
          toast.add({
            type: "success",
            description: res.message || "Password changed successfully",
          });
          form.reset();
          onCancel();
        }
      } catch (error) {
        console.log(error);
        toast.add({
          type: "error",
          description: "An error occured",
        });
      }
    });
  }

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  function handleToggle(
    setterFn: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    setterFn((prev: boolean) => !prev);
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-6 md:h-full"
      id="change-password-form"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="current_password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="oldPassword" className={"text-lg-medium"}>
                Old Password
              </FieldLabel>

              <div className="relative">
                <Input
                  placeholder="enter your last password"
                  id="oldPassword"
                  autoComplete="new-password"
                  type={showOldPassword ? "text" : "password"}
                  {...field}
                />
                {showOldPassword ? (
                  <EyeClosed
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowOldPassword)}
                    size={18}
                  />
                ) : (
                  <Eye
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowOldPassword)}
                    size={18}
                  />
                )}
              </div>
              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="new_password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="newPassword" className={"text-lg-medium"}>
                Create Password
              </FieldLabel>

              <div className="relative">
                <Input
                  placeholder="create a password"
                  id="newPassword"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
                {showPassword ? (
                  <EyeClosed
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowPassword)}
                    size={18}
                  />
                ) : (
                  <Eye
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowPassword)}
                    size={18}
                  />
                )}
              </div>

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="confirmPassword"
                className={"text-lg-medium"}
              >
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  placeholder="Re-enter password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  {...field}
                  type={showConfPassword ? "text" : "password"}
                />
                {showConfPassword ? (
                  <EyeClosed
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowConfPassword)}
                    size={18}
                  />
                ) : (
                  <Eye
                    className="text-neutra-600 absolute top-1/2 right-1 -translate-1/2 cursor-pointer"
                    onClick={() => handleToggle(setShowConfPassword)}
                    size={18}
                  />
                )}
              </div>
              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="">
          <Button
            type="button"
            onClick={onCancel}
            className={"bg-transparent text-black hover:bg-transparent"}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            disabled={isPending}
            className={"text-md-medium"}
          >
            Update
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ChangePassword;
