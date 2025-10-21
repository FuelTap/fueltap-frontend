import { z } from 'zod';

export const amountSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Amount must be a number.',
      required_error: 'Amount is required.',
    })
    .min(500, { message: 'Amount must not be less than 500.' }),
});
