"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  supportFormSchema,
  SupportFormInput,
} from "@/lib/validators/supportFormSchema";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
export default function SupportForm() {
  const form = useForm<SupportFormInput>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      type: "",
      message: "",
    },
  });

  const submitForm = (data: SupportFormInput) => {
    console.log(data);
  };
  return (
    <form id="support-form" onSubmit={form.handleSubmit(submitForm)}>
      <FieldSet>
        <FieldLegend className="text-3xl!">Send us a message</FieldLegend>
        <FieldDescription className="text-neutra-1000 text-[16px]">
          Fill out the form and we'll get back to you soon.
        </FieldDescription>

        <FieldGroup className="mt-9">
          <div className="flex items-center gap-3">
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-[16]! font-medium"
                    htmlFor="fullname"
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="fullname"
                    placeholder="Enter your name"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-[16]! font-medium"
                    htmlFor="email"
                  >
                    Email
                  </FieldLabel>
                  <Input {...field} id="email" placeholder="Enter your email" />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[16]! font-medium"
                  htmlFor="subject"
                >
                  Subject
                </FieldLabel>
                <Input {...field} id="subject" placeholder="Enter subject" />
                {fieldState.invalid && fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-[16]! font-medium"
                  htmlFor="message"
                >
                  Message
                </FieldLabel>
                <Textarea
                  className="h-40"
                  {...field}
                  id="message"
                  placeholder="Leave us a message"
                />
                {fieldState.invalid && fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button
              size={"full"}
              type="submit"
              className={"w-full! rounded-[24px]! bg-green-500! py-3! px-4!"}
            >
              Contact Us
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
