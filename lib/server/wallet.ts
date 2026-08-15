"use server";

import { authenticatedApiRequest } from "../helpers/fetch/authenticatedApiRequest";

export async function getWalletBalance() {
  return await authenticatedApiRequest<void, { balance: number }>(
    `api/v1/wallet/balance`,
  );
}
