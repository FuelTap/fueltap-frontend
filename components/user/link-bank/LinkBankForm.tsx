"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  bankAccountSchema,
  BankAccountSchemaInput,
} from "@/lib/validators/WalletSchema";
import { handleNumericInput, preventInvalidKeys } from "@/lib/utils";
import bankData from "@/public/banks.json";
import { SearchableSelect } from "@/components/web/SearchableSelect";
import { addBankAccount, verifyBankDetails } from "@/lib/server/wallet";
import { toast } from "@/components/ui/toast";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Check } from "@/components/animate-ui/icons/check";
import { useRouter } from "next/navigation";

interface Props {
  onComplete: Dispatch<SetStateAction<boolean>>;
}
const LinkBankForm = ({ onComplete }: Props) => {
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(bankAccountSchema),
  });

  // code to check when bankname and number has been selected and fetch account name

  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const [userAccountName, setUserAccountName] = useState("");
  const bankName = form.watch("bankName");
  const accountNumber = form.watch("accountNumber");

  useEffect(() => {
    async function fetchAccountName() {
      if (bankName && accountNumber?.length === 10) {
        setIsResolving(true);
      }
      try {
        const res = await verifyBankDetails(bankName, accountNumber);
        if (!res.success) {
          return toast.add({
            title: "Error",
            description:
              res.message || "Something went wrong, please try again later.",
          });
        }
        const fetchedName = res.data.data?.account_name;
        form.setValue("accountName", fetchedName);
        setUserAccountName(fetchedName);
        setResolved(true);
      } catch (error: any) {
        toast.add({
          title: "Error",
          description:
            error.message || "Something went wrong, please try again later.",
        });
        setResolved(false);
      } finally {
        setIsResolving(false);
      }
    }

    if (bankName && accountNumber?.length === 10) fetchAccountName();
  }, [bankName, accountNumber, form]);

  const allBankNames = bankData.map((bankObject) => bankObject.name);

  const onSubmit = async (payload: BankAccountSchemaInput) => {
    console.log("bank payload: ", payload);
    try {
      const res = await addBankAccount(payload);
      // console.log(res);
      if (!res.success) {
        return toast.add({
          title: "Error",
          description:
            res.message || "Something went wrong, please try again later.",
        });
      }
      toast.add({
        title: "Success",
        description: "Bank account added successfully",
      });

      onComplete(true);
    } catch (error: any) {
      const message =
        error.response?.data?.data.message ||
        error.message ||
        "Failed to add bank account. Please try again later.";
      toast.add({ title: "Error", description: message });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col space-y-6"
      id="link-bank-form"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="bankName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bankName" className="text-sm  font-medium">
                Bank Name
              </FieldLabel>

              <SearchableSelect
                items={allBankNames}
                value={field.value}
                onChange={field.onChange}
                placeholder="Choose bank name"
              />

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="accountNumber"
                className="text-sm  font-medium"
              >
                Account Number
              </FieldLabel>

              <Input
                type="text"
                placeholder="Enter your 10 digit number"
                className="placeholder:text-grey-800 placeholder:text-xs rounded-[999px]!"
                {...field}
                onChange={(e) => handleNumericInput(e, field, 10)}
                onKeyDown={preventInvalidKeys}
              />

              {fieldState.error && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {userAccountName !== "" && (
          <div className="h-15 bg-gray-100 rounded-[999px] flex items-center justify-between p-3">
            <h5 className="text-sm font-semibold">{userAccountName}</h5>
            <AnimateIcon animateOnView>
              <Check className="bg-green-500 text-white size-7.5 rounded-full p-2" />
            </AnimateIcon>
          </div>
        )}

        {/* hidden input field */}
        <Controller
          control={form.control}
          name="accountName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="invisible h-0">
              <FieldLabel htmlFor="accountName" className="text-lg-medium">
                Account Name
              </FieldLabel>

              <Input
                type="text"
                placeholder={
                  isResolving ? "Verifying..." : "Account name will appear here"
                }
                {...field}
                disabled
              />

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
            disabled={isResolving}
            onClick={() => push("/user/dashboard")}
          >
            Cancel
          </Button>

          <Button
            className={"basis-[48%]"}
            size={"full"}
            type="submit"
            disabled={!resolved || isResolving}
          >
            {isResolving ? "Verifying..." : "Continue"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default LinkBankForm;
