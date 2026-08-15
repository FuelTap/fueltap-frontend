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

export const passwordSchema = z
  .object({
    password: z
      .string({
        message: "field can not be empty!.",
      })
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),

    confirmPassword: z.string({
      message: "field can not be empty!.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type PasswordInput = z.infer<typeof passwordSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

export type otpInput = z.infer<typeof otpSchema>;

export const registerationSchema = z.object({
  fullName: z
    .string({
      message: "field can not be empty!.",
    })
    .min(2, {
      message: "full name must be at least 2 characters.",
    }),
  email: z
    .string({
      message: "field can not be empty!.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  phone: z
    .string({
      message: "field can not be empty!.",
    })
    .regex(/^(?:\+?234|0)?([789]\d{9})$/, {
      message: "Please enter a valid Nigerian phone number.",
    }),
});

export type registrationInput = z.infer<typeof registerationSchema>;
