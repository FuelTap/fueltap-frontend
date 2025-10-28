import z from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        message: 'field can not be empty!.',
      })
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character.'
      ),
    password: z
      .string({
        message: 'field can not be empty!.',
      })
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character.'
      ),

    confirmPassword: z.string({
      message: 'field can not be empty!.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // attaches the error to confirmPassword field
  });
