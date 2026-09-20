"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PinInput, pinSchema } from "@/lib/validators/WalletSchema";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { setTransactionPin } from "@/lib/server/wallet";

interface Props {
  onComplete: Dispatch<SetStateAction<boolean>>;
}
const SetPinForm = ({ onComplete }: Props) => {
  const { push } = useRouter();

  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  function handleToggle(
    setterFn: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    setterFn((prev) => !prev);
  }

  const form = useForm<PinInput>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = (payload: PinInput) => {
    startTransition(async (): Promise<void> => {
      try {
        const res = await setTransactionPin(payload);
        console.log("response: ", res);
        if (!res.success) {
          toast.add({
            title: "Error",
            description:
              res.message || "Something went wrong, please try again later.",
          });
          return;
        }
        toast.add({
          title: "Success",
          description: "Transaction PIN set successfully",
        });

        startTransition(() => onComplete(true));
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to set transaction PIN. Please try again later.";
        toast.add({ title: "Error", description: message });
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col space-y-6"
      id="set-pin-form"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="pin"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="pin" className="text-sm  font-medium">
                Preferred PIN
              </FieldLabel>

              <div className="relative">
                <Input
                  type={showPin ? "text" : "password"}
                  id="pin"
                  inputMode="numeric"
                  disabled={isPending}
                  placeholder="1111"
                  className="placeholder:text-grey-800 placeholder:text-xs rounded-[999px]! "
                  {...field}
                  onChange={(e) => {
                    // Sanitize typing, paste, and autofill without converting to a number.
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    e.target.value = digits;
                    field.onChange(digits);
                  }}
                  onKeyDown={(e) => {
                    if (
                      !e.ctrlKey &&
                      !e.metaKey &&
                      !e.altKey &&
                      e.key.length === 1 &&
                      !/^[0-9]$/.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                {showPin ? (
                  <Eye
                    size={14}
                    className="absolute cursor-pointer text-neutra-1000 top-1/2 right-2 -translate-y-1/2"
                    onClick={() => handleToggle(setShowPin)}
                  />
                ) : (
                  <EyeClosed
                    size={14}
                    className="absolute cursor-pointer text-neutra-1000 top-1/2 right-2 -translate-y-1/2"
                    onClick={() => handleToggle(setShowPin)}
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
          name="confirmPin"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPin" className="text-sm  font-medium">
                Confirm Pin
              </FieldLabel>

              <div className="relative">
                <Input
                  type={showConfirmPin ? "text" : "password"}
                  id="confirmPin"
                  inputMode="numeric"
                  disabled={isPending}
                  placeholder="****"
                  className="placeholder:text-grey-800 placeholder:text-xs rounded-[999px]! "
                  {...field}
                  onChange={(e) => {
                    // Sanitize typing, paste, and autofill without converting to a number.
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    e.target.value = digits;
                    field.onChange(digits);
                  }}
                  onKeyDown={(e) => {
                    if (
                      !e.ctrlKey &&
                      !e.metaKey &&
                      !e.altKey &&
                      e.key.length === 1 &&
                      !/^[0-9]$/.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                {showConfirmPin ? (
                  <Eye
                    size={14}
                    className="absolute cursor-pointer text-neutra-1000 top-1/2 right-2 -translate-y-1/2"
                    onClick={() => handleToggle(setShowConfirmPin)}
                  />
                ) : (
                  <EyeClosed
                    size={14}
                    className="absolute cursor-pointer text-neutra-1000 top-1/2 right-2 -translate-y-1/2"
                    onClick={() => handleToggle(setShowConfirmPin)}
                  />
                )}
              </div>

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            size={"full"}
            className={
              "text-primary border-primary outline-primary basis-[48%]"
            }
            type="button"
            disabled={isPending}
            onClick={() => push("/user/dashboard")}
          >
            Cancel
          </Button>

          <Button
            className={"basis-[48%]"}
            size={"full"}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Setting PIN..." : "Continue"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default SetPinForm;
