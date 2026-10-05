"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";
import {
  identitySchema,
  proofOfAddressSchema,
  type IdentityInput,
} from "@/lib/validators/kycSchema";

export async function submitIdentity(payload: IdentityInput) {
  try {
    const validated = identitySchema.safeParse(payload);
    if (!validated.success) {
      console.log("kyc doc failed: ", validated);
      return {
        success: false,
        status: "error",
        message: validated.error.issues[0].message,
      };
    }

    return authenticatedApiRequest(
      "api/v1/kyc/identity",
      "POST",
      validated.data,
    );
  } catch (error) {
    console.log(error);
  }
}

export async function submitProofOfAddress(payload: FormData) {
  try {
    const validated = proofOfAddressSchema.safeParse(payload.getAll("file"));
    if (!validated.success) {
      return {
        success: false,
        status: "error",
        message: validated.error.issues[0].message,
      };
    }

    const body = new FormData();
    for (const file of validated.data) body.append("file", file);
    return authenticatedApiRequest("api/v1/kyc/proof-of-address", "POST", body);
  } catch (error) {
    console.log(error);
  }
}
