"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import {
  registerationSchema,
  registrationInput,
} from "@/lib/validators/authSchema";
import { FilePen } from "lucide-react";
import { splitName } from "@/lib/helpers/help";

const ProfileSettings = () => {
  const { user } = useAuth();

  const form = useForm<registrationInput>({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      fullName: user?.full_name,
      phone: user?.phone_number,
    },
  });
  function onSubmit(data: registrationInput) {
    return null;
  }

  const name = user?.full_name;

  return (
    <article className="bg-secondary-50 mt-4 p-2 md:mt-8 md:p-8">
      <div className="mb-6 hidden space-y-0.5 lg:block">
        <h4 className="title">Profile Information</h4>
        <p className="text-lg-regular text-gray-800">
          Update your personal details and profile photo
        </p>
      </div>

      <div className="flex gap-4 lg:gap-12">
        <div className="flex flex-col gap-1">
          <Avatar className="size-15 text-lg md:size-23 md:text-2xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{splitName(user?.full_name || "")}</AvatarFallback>
          </Avatar>
          <small className="text-primary-400 text-xs font-medium md:text-sm">
            Change photo
          </small>
        </div>

        {/* smaller screens part */}
        <div className="flex flex-1 items-center justify-between lg:hidden">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium">{user?.full_name}</h2>
            <h5 className="text-sm font-normal">{user?.email}</h5>
            <h4 className="text-secondary-600 text-sm font-normal">
              {user?.phone_number}
            </h4>
          </div>

          <FilePen className="text-grey-600" size={24} />
        </div>
        {/* form part */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="hidden w-full space-y-9 lg:block"
          id="form"
        >
          <FieldGroup>
            <div className="flex items-center justify-between">
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={"basis-[49%]"}
                  >
                    <FieldLabel
                      htmlFor="full_name"
                      className={"text-lg-medium"}
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      id="full_name"
                      placeholder="Ochife Ogechukwu"
                      {...field}
                    />

                    {fieldState.error && fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={"basis-[49%]"}
                  >
                    <FieldLabel htmlFor="phone" className={"text-lg-medium"}>
                      Phone Number
                    </FieldLabel>

                    <Input
                      id="phone"
                      placeholder="90 22473 2723"
                      inputMode="numeric"
                      onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, "");
                      }}
                      className={
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:border-l-0 focus-visible:ring-[1px]"
                      }
                      {...field}
                    />

                    {fieldState.error && fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant={"secondary"}
                className="text-md-medium"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                className="text-md-medium bg-transparent text-black hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </article>
  );
};

export default ProfileSettings;
