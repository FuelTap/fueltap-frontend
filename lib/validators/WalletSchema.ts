import { z } from "zod";

export const amountSchema = z.object({
  amount: z
    .number("Amount must be a number.")
    .min(500, { message: "Amount must not be less than 500." }),
});

export type AmountSchemaInput = z.infer<typeof amountSchema>;

export const bankAccountSchema = z.object({
  bankName: z.string({
    message: "field can not be empty!.",
  }),
  accountNumber: z
    .string({
      message: "field can not be empty!.",
    })
    .regex(/^\d{10}$/, {
      message: "Account number must be exactly 10 digits.",
    }),
  accountName: z.string({
    message: "field can not be empty!.",
  }),
});
export type BankAccountSchemaInput = z.infer<typeof bankAccountSchema>;

export const pinSchema = z
  .object({
    pin: z.string().length(4, "PIN must be 4 digits"),
    confirmPin: z.string().length(4, "PIN must be 4 digits"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Pins do not match",
    path: ["confirmPin"],
  });

export type PinInput = z.infer<typeof pinSchema>;
