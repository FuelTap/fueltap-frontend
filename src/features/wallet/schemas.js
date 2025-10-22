import { z } from 'zod';

export const amountSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Amount must be a number.',
      required_error: 'Amount is required.',
    })
    .min(500, { message: 'Amount must not be less than 500.' }),
});

export const bankAccountSchema = z.object({
  bankName: z.string({
    message: 'field can not be empty!.',
  }),
  accountNumber: z
    .string({
      message: 'field can not be empty!.',
    })
    .regex(/^\d{10}$/, {
      message: 'Account number must be exactly 10 digits.',
    }),
  accountName: z.string({
    message: 'field can not be empty!.',
  }),
});
