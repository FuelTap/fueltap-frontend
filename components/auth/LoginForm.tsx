"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useState } from "react";
// import { login } from './api';
import { toast } from "sonner";
// import { useDispatch } from 'react-redux';
// import { setUserData } from './userSlice';
// import { saveToLocalStorage } from '@/utils/helpers';
import { useRouter } from "next/navigation";
import { LoginInput, loginSchema } from "@/lib/validators/loginSchema";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Note: changed EyeClosed to EyeOff (standard Lucide icon)

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    // ✅ Always provide defaultValues when using Controller to prevent "uncontrolled to controlled" errors
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useRouter();
  // const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: LoginInput) {
    console.log(data);
    setIsSubmitting(true);
    // try {
    //   const response = await login(data);
    //   toast.success("Login successful!");
    //   if (response.data) {
    //     const { user, accessToken, refreshToken } = response.data;
    //
    //     dispatch(
    //       setUserData({
    //         accessToken,
    //         refreshToken,
    //         user,
    //       })
    //     );
    //     saveToLocalStorage('userData', {
    //       accessToken,
    //       refreshToken,
    //       user,
    //     });
    //     navigate.push('/user'); // ✅ Next.js uses router.push instead of navigate()
    //   }
    // } catch (error: any) {
    //   const message =
    //     error.response?.data?.message || error?.message || "Login failed";
    //   toast.error(message);
    //   console.log(error);
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Simulate API delay for testing since it's commented out
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-6"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>

              <Input
                placeholder="example@mail.com"
                id="email"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                {...field}
              />

              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium" htmlFor="password">
                Enter password
              </FieldLabel>

              <div className="relative flex items-center">
                <Input
                  id="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="pr-10" // ✅ Add padding to ensure the text doesn't overlap the icon
                  {...field}
                />
                <button
                  type="button" // ✅ Crucial: prevents button from accidentally triggering form submit
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Link
          className="text-primary -mt-5 inline-block text-sm"
          href="/forgot-password"
        >
          Forgot Password?
        </Link>

        <div className="mb-4 justify-self-start max-sm:mt-auto w-full">
          <Button
            type="submit"
            variant="secondary"
            size="full"
            className="text-md-medium w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging you in..." : "Next"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
