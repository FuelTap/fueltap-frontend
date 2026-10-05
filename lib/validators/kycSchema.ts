import { z } from "zod";

export const MAX_KYC_FILES = 1;
export const MAX_KYC_FILE_SIZE = 5 * 1024 * 1024;

export const proofOfAddressSchema = z
  .array(
    z.file()
      .min(1, "Files must not be empty")
      .max(MAX_KYC_FILE_SIZE, "Each file must be 5 MB or smaller")
      .mime(["image/png", "image/jpeg", "application/pdf"], "Only PNG, JPEG, and PDF files are supported"),
  )
  .min(1, "Please upload one proof of address document")
  .max(MAX_KYC_FILES, "Upload only one proof of address file");

export const identitySchema = z.object({
  bvn: z.string().optional(),
  nin: z.string().optional(),
}).superRefine((data, ctx) => {
  if (Boolean(data.bvn) === Boolean(data.nin)) {
    for (const path of ["bvn", "nin"]) {
      ctx.addIssue({ code: "custom", path: [path], message: "Provide either BVN or NIN" });
    }
  }
  for (const field of ["bvn", "nin"] as const) {
    if (data[field] && !/^\d{11}$/.test(data[field])) {
      ctx.addIssue({ code: "custom", path: [field], message: `${field.toUpperCase()} must be 11 digits` });
    }
  }
});

export const kycSchema = identitySchema.safeExtend({
  proofOfAddress: proofOfAddressSchema,
});

export type IdentityInput = z.infer<typeof identitySchema>;
export type kycSchemaInput = z.infer<typeof kycSchema>;
