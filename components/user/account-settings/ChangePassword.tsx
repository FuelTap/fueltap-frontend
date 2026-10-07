"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import {
  changePasswordSchema,
  ChangePasswordSchemaInput,
} from "@/lib/validators/authSchema";
import { toast } from "@/components/ui/toast";
import { changePassword } from "@/lib/server/auth";
import { useAuth } from "@/context/AuthProvider";

interface ChangePasswordProps {
  onCancel: () => void;
  setPassUpdate: (prop: boolean) => void;
}

const ChangePassword = ({ onCancel, setPassUpdate }: ChangePasswordProps) => {
  const { logout } = useAuth();
  const form = useForm<ChangePasswordSchemaInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {},
  });

  const password = form.watch("new_password") || "";

  const rules = {
    length: password.length > 7 && password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

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
          // toast.add({
          //   type: "success",
          //   description: res.message || "Password changed successfully",
          // });
          setPassUpdate(true);
          form.reset();
          onCancel();
          await logout();
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
      className="flex min-h-100  flex-col space-y-6 "
      id="change-password-form"
    >
      <FieldGroup className="h-full">
        <Controller
          control={form.control}
          name="current_password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="oldPassword" className={"text-lg-medium"}>
                Current Password
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
                New Password
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

        {/* messages */}
        <ul className="list-disc space-y-1 px-4">
          <li className={rules.length ? "text-green-600" : "text-gray-500"}>
            Password should be 8-20 characters long
          </li>
          <li className={rules.uppercase ? "text-green-600" : "text-gray-500"}>
            At least one uppercase letter
          </li>
          <li className={rules.lowercase ? "text-green-600" : "text-gray-500"}>
            At least one lowercase letter
          </li>
          <li className={rules.number ? "text-green-600" : "text-gray-500"}>
            At least one number
          </li>
          <li className={rules.special ? "text-green-600" : "text-gray-500"}>
            At least one special character: @ ! # $ % & =
          </li>
        </ul>

        <Controller
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="confirmPassword"
                className={"text-lg-medium"}
              >
                Confirm New Password
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

        <div className="justify-self-end flex items-center gap-1 mt-auto!">
          <Button
            variant={"outline"}
            size={"full"}
            className={
              "text-primary border-primary outline-primary max-sm:p-2 basis-1/2"
            }
            type="button"
            onClick={onCancel}
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            size={"full"}
            className={`max-sm:p-2 basis-1/2`}
          >
            Update
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ChangePassword;
