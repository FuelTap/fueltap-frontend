import { z } from 'zod';

export const kycSchema = z
  .object({
    bvn: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{11}$/.test(val), {
        message: 'BVN must be 11 digits',
      }),
    nin: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{11}$/.test(val), {
        message: 'NIN must be 11 digits',
      }),
    proofOfAddress: z
      .any()
      .refine(
        (file) => file?.length === 1,
        'Please upload one proof of address document'
      ),
  })
  .refine((data) => data.bvn || data.nin, {
    message: 'You must provide either BVN or NIN',
    path: ['bvn'], // attaches the error near BVN field
  });
