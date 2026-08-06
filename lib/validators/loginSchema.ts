import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "field can not be empty!.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z.string({
    message: "field can not be empty!.",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
