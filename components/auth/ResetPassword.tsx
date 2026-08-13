"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  passwordSchema,
  type PasswordInput,
} from "@/lib/validators/authSchema";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { axiosInstance } from "@/api/axios";
import { toast } from "sonner";

interface ErrorWithResponse extends Error {
  code?: string;
  response?: {
    data: {
      message?: string;
    };
  };
}

export default function ResetPassword() {
  const form = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password") || "";

  const rules = {
    length: password.length > 7 && password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  async function onSubmit(data: PasswordInput) {
    const payload = {
      new_password: data.password,
      confirm_password: data.confirmPassword,
      token,
      email,
    };

    console.log(payload);

    // startTransition(async () => {
    //   try {
    //     const response = await axiosInstance.post(
    //       "v1/auth/reset-password",
    //       payload,
    //     );
    //     const { message } = response.data;
    //     toast.success(message);
    //     router.push("/login");
    //   } catch (error) {
    //     const err = error as ErrorWithResponse;
    //     if (err.code === "ERR_NETWORK") {
    //       toast.error(err.message);
    //     } else {
    //       toast.error(err.response?.data?.message || "something went wrong");
    //     }
    //     console.error(err);
    //   }
    // });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  function handleToggle(
    setterFn: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    setterFn((prev) => !prev);
  }

  return (
    <form
      id="reset-password-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-4 md:h-full"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">
                Create Password
              </FieldLabel>
              <>
                <div className="relative">
                  <Input
                    placeholder="create a password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowPassword)}
                      size={18}
                    />
                  ) : (
                    <Eye
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowPassword)}
                      size={18}
                    />
                  )}
                </div>

                {fieldState.invalid && fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">
                Confirm Password
              </FieldLabel>
              <>
                <div className="relative">
                  <Input
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    type={showConfPassword ? "text" : "password"}
                    {...field}
                  />
                  {showConfPassword ? (
                    <EyeOff
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowConfPassword)}
                      size={18}
                    />
                  ) : (
                    <Eye
                      className="text-neutra-600 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleToggle(setShowConfPassword)}
                      size={18}
                    />
                  )}
                </div>
                {fieldState.invalid && fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </>
            </Field>
          )}
        />

        {/* messages */}
        <ul className="list-disc space-y-1">
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

        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button
            type="submit"
            size="full"
            disabled={isPending}
            className="text-md-medium"
          >
            {isPending ? "Creating..." : "Next"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
