"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput, loginSchema } from "@/lib/validators/authSchema";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/lib/server/auth";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { push } = useRouter();
  // const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: LoginInput) {
    setIsSubmitting(true);
    try {
      const response = await loginAction(data);
      if (response.success) {
        toast.add({
          title: "Login successful!",
          type: "success",
        });
      } else {
        toast.add({
          title: "Login failed!",
          description: response.error,
          type: "error",
        });
      }
      if (response.data) {
        console.log(response);
        // const { user, accessToken, refreshToken } = response.data;
        push("/user/dashboard");
        // saveToLocalStorage('userData', {
        //   accessToken,
        //   refreshToken,
        //   user,
        // });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || error?.message || "Login failed";
      toast.add({
        title: "Login failed!",
        description: message,
        type: "error",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-6"
      autoComplete="off"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className={"text-lg-medium"}>
                Email Address
              </FieldLabel>

              <Input
                placeholder="example@mail.com"
                id="email"
                className="p-3 rounded-lg border border-neutra-500 h-10 placeholder:text-neutra-700 placeholder:font-normal"
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
                  className="p-3 rounded-lg border border-neutra-500 h-10 placeholder:text-neutra-700 placeholder:font-normal  pr-10"
                  {...field}
                />
                <button
                  type="button"
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

        <Link className="text-primary -mt-3  text-sm" href="/forgot-password">
          Forgot Password?
        </Link>

        <div className="mb-4 justify-self-start mt-10 max-sm:mt-auto w-full">
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
