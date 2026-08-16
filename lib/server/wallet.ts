"use server";

import { authenticatedApiRequest } from "../helpers/fetch/authenticatedApiRequest";
import { PinInput, pinSchema } from "../validators/WalletSchema";

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
