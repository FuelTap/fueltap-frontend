"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NotebookPen, UploadCloud } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { kycSchema, kycSchemaInput } from "@/lib/validators/kycSchema";
import { Switch } from "@/components/ui/switch";
import MyDropzone from "@/components/web/MyDropzone";
import { submitIdentity, submitProofOfAddress } from "@/lib/server/kyc";
const KycForm = () => {
  const [useBVN, setUseBVN] = useState(true);
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);
  const submittedIdentity = useRef<string | null>(null);

  const form = useForm<kycSchemaInput>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      bvn: "",
      nin: "",
      proofOfAddress: [],
    },
  });

  const { push } = useRouter();

  async function onSubmit(values: kycSchemaInput) {
    if (submitting.current) return;
    submitting.current = true;
    setLoading(true);

    const submission = async () => {
      const identity = useBVN ? { bvn: values.bvn } : { nin: values.nin };
      const identityKey = JSON.stringify(identity);
      // Preserve successful identity submission if the address upload needs retrying.
      if (submittedIdentity.current !== identityKey) {
        const result = await submitIdentity(identity);
        if (!result?.success || result.status !== "success") {
          throw new Error(result?.message || "Identity verification failed");
        }
        submittedIdentity.current = identityKey;
      }

      const body = new FormData();
      values.proofOfAddress.forEach((file) => body.append("file", file));
      const result = await submitProofOfAddress(body);
      if (!result?.success || result.status !== "success") {
        console.log("req result : ", result);
        throw new Error(result?.message || "Proof of address upload failed");
      }
    };

    try {
      await toast.promise(submission(), {
        loading: { title: "Submitting your KYC documents...", type: "loading" },
        success: {
          title: "Documents submitted. Proceeding to liveness check.",
          type: "success",
        },
        error: (error: unknown) => {
          console.log(error);
          return {
            title: "KYC submission failed",
            description:
              error instanceof Error ? error.message : "Please try again.",
            type: "error",
          };
        },
      });
      push("/user/kyc/liveness");
    } catch (error) {
      console.log(error);
      // The promise toast displays the failure; retain the form for retry.
      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
      id="kyc-form"
      aria-busy={loading}
      autoComplete="off"
      className=""
    >
      <FieldGroup>
        <div className="relative">
          <div className="absolute top-5 left-0 -z-10 h-[71%] w-0.75 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,#d1d5db_0_10px,transparent_10px_20px)] md:hidden"></div>

          {/* BVN/NIN Section */}
          <div className=" mx-auto mt-8 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full  bg-gray-100">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4 text-green-600">
                <div className="size-10 flex items-center justify-center rounded-full bg-green-100">
                  <NotebookPen className="" />
                </div>
                <h3 className="text-sm font-semibold text-green-600 ">
                  Provide BVN or NIN
                </h3>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex flex-col gap-2">
              <small className="text-sm text-grey-800 lg:text-base">
                Toggle to change from BVN to NIN
              </small>

              <div className="flex items-center gap-3">
                <span
                  className={`text-base font-medium lg:text-lg text-yellow-600
                  `}
                >
                  BVN
                </span>

                <Switch
                  checked={!useBVN}
                  className={"data-unchecked:bg-accent!"}
                  disabled={loading}
                  onCheckedChange={(checked) => {
                    setUseBVN(!checked);
                    form.setValue(checked ? "bvn" : "nin", "");
                    form.clearErrors(["bvn", "nin"]);
                  }}
                  aria-label="Switch between BVN and NIN"
                />

                <span
                  className={`text-base font-medium lg:text-lg text-yellow-600`}
                >
                  NIN
                </span>
              </div>
            </div>

            {/* Input field */}

            <Controller
              control={form.control}
              name={useBVN ? "bvn" : "nin"}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label className="font-medium text-black">
                    {useBVN
                      ? " Bank Verification Number (BVN)"
                      : "National Identification Number "}
                  </Label>
                  <Input
                    type="text"
                    placeholder={useBVN ? "Enter your BVN" : "Enter your NIN"}
                    disabled={loading}
                    inputMode="numeric"
                    maxLength={11}
                    {...field}
                    className="mt-1 block w-full bg-white border-gray-200 shadow-sm focus:border-green-500 outline outline-gray-200 py-4 px-5 rounded-[999px] focus:ring-green-500"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Proof of Address Section */}
          <div className="mx-auto mt-1 w-[95%] space-y-6 rounded-[12px] px-4 py-3 md:w-full md:bg-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-green-600">
                <div className="size-10 flex items-center justify-center rounded-full bg-green-100">
                  <UploadCloud className="" />
                </div>
                <h3 className="text-[18px] font-semibold text-green-600 md:text-xl lg:text-2xl">
                  Upload Proof of Address
                </h3>
              </div>
            </div>

            <Controller
              control={form.control}
              name="proofOfAddress"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div>
                    <FieldLabel
                      htmlFor="file"
                      className="flex flex-col text-xs lg:text-sm items-start font-medium text-grey-800 mb-4"
                    >
                      Upload proof of address, such as a utility bill or bank
                      statement.
                    </FieldLabel>

                    <MyDropzone
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading}
                    />

                    <p className="flex flex-col text-xs lg:text-sm items-start font-medium text-grey-800 mt-4">
                      Upload one JPG, JPEG, PNG, or PDF file, up to 5 MB.
                    </p>
                  </div>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <Button
              variant={"outline"}
              size={"full"}
              className={
                "text-primary border-primary outline-primary basis-[48%]"
              }
              type="button"
              disabled={loading}
              onClick={() => push("/user/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"secondary"}
              size={"full"}
              className={"text-white basis-[48%]"}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </FieldGroup>
    </form>
  );
};

export default KycForm;
