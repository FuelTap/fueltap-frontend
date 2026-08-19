"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { authenticatedApiRequest } from "../helpers/fetch/authenticatedApiRequest";
import {
  bankAccountSchema,
  BankAccountSchemaInput,
  PinInput,
  pinSchema,
} from "../validators/WalletSchema";

export async function getWalletBalance() {
  return await authenticatedApiRequest<void, { balance: number }>(
    `api/v1/wallet/balance`,
  );
}

// {
//   data: {
//     authorization_url: string;
//     access_code: string;
//     reference: string;
//   };
// }
export async function initializeAddFundToWallet(amount: number) {
  return await authenticatedApiRequest<{ amount: number }, any>(
    `api/v1/wallet/add-funds`,
    "POST",
    {
      amount,
    },
  );
}

export async function setTransactionPin(payload: PinInput) {
  const validatedFields = pinSchema.safeParse(payload);

  if (!validatedFields.success) {
    console.log(validatedFields);
    return {
      success: false,
      message: "validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { pin } = validatedFields.data;

  console.log(validatedFields);
  return await authenticatedApiRequest<{ pin: string }, { success: boolean }>(
    `api/v1/wallet/set-transaction-pin`,
    "POST",
    { pin },
  );
}

// ============================================VERIFY BANK=========================================

export async function verifyBankDetails(
  bankName: string,
  accountNumber: string,
) {
  return await authenticatedApiRequest<
    { bankName: string; accountNumber: string },
    any
  >(`/api/v1/account/verify-bank`, "POST", {
    bankName: bankName,
    accountNumber: accountNumber,
  });
}

// ============================================ADD BANK ACCOUNT=========================================

export async function addBankAccount(payload: BankAccountSchemaInput) {
  const validate = bankAccountSchema.safeParse(payload);
  if (!validate.success) {
    return {
      success: false,
      message: "validation failed",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  revalidateTag("user-profile", "max");
  revalidatePath(`/user`, "layout");
  return await authenticatedApiRequest<BankAccountSchemaInput, void>(
    `/api/v1/account/add-bank`,
    "POST",
    validate.data,
  );
}
