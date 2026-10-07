"use client";

import { useAuth } from "@/context/AuthProvider";
import {
  registerationSchema,
  registrationInput,
} from "@/lib/validators/authSchema";
import { FilePen } from "lucide-react";
import { splitName } from "@/lib/helpers/help";
import { useState } from "react";
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

const ProfileForm = () => {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);

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
    <article className="bg-yellow-100 border-[0.5px] rounded-2xl border-yellow-200 p-5 md:p-8 mb-3">
      <div className="flex gap-4 md:gap-5">
        <div className="flex flex-col gap-1">
          <Avatar className="size-15 text-lg md:text-2xl cursor-pointer ">
            <AvatarImage src="https://github.com/shadcn.pnsg" />
            <AvatarFallback
              className={"text-white bg-primary text-lg font-medium"}
            >
              {splitName(user?.full_name || "")}
            </AvatarFallback>
          </Avatar>
        </div>

        {showForm ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-9"
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
                        disabled
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
                        disabled
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
                  disabled
                  variant={"secondary"}
                  className="text-md-medium"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-md-medium bg-transparent text-black hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </form>
        ) : (
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-base md:text-xl font-medium">
                {user?.full_name}
              </h2>
              <h5 className="text-xs md:text-sm font-normal">{user?.email}</h5>
              <h4 className="text-secondary-600 text-xs md:text-sm font-normal">
                {user?.phone_number}
              </h4>
            </div>

            <span
              className="size-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              <FilePen className="text-white" size={20} />
            </span>
          </div>
        )}

        {/* form part */}
      </div>
    </article>
  );
};

export default ProfileForm;
