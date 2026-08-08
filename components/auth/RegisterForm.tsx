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
import { ChevronDown } from "lucide-react";
import {
  registerationSchema,
  registrationInput,
} from "@/lib/validators/authSchema";
import { useRouter } from "next/navigation";
// import { useLocation, useNavigate } from 'react-router';
// import { MdKeyboardArrowDown } from 'react-icons/md';

const RegisterForm = () => {
  // 1. Define your form.
  const form = useForm<registrationInput>({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });
  //   const location = useLocation();
  //   console.log(location);
  //   const { registerAs } = location.state || 'customer';

  const router = useRouter();
  function onSubmit(data: registrationInput) {
    const cleanedPhone = data.phone.startsWith("0")
      ? data.phone.slice(1)
      : data.phone;
    // navigate('/confirm-password', {
    //   state: { ...data, phone: cleanedPhone, registerAs },
    // });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-6 md:h-full"
      id="signup-form"
      autoComplete="off"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fullName" className={"text-lg-medium"}>
                Full Name
              </FieldLabel>

              <Input id="fullName" placeholder="Ochife Ogechukwu" {...field} />

              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className={"text-lg-medium"}>
                Email Address
              </FieldLabel>

              <Input id="email" placeholder="fueltap@support.com" {...field} />

              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone" className={"text-lg-medium"}>
                Phone Number
              </FieldLabel>

              <div className="flex">
                <div className="text-primary-400 bg-primary-50 flex items-center justify-center gap-2 rounded-l px-2">
                  <span className="text-xl">NGN</span>
                  <ChevronDown size={16} />
                </div>

                <Input
                  id="phone"
                  placeholder="90 22473 2723"
                  inputMode="numeric"
                  onInput={(e) => {
                    const target = e.currentTarget as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9]/g, "");
                  }}
                  className={
                    "focus-visible:border-ring focus-visible:ring-ring/50 rounded-l-none border-l-0 focus-visible:border-l-0 focus-visible:ring-[1px]"
                  }
                  {...field}
                />
              </div>

              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button type="submit" size={"full"} className="text-md-medium w-full">
            Next
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
