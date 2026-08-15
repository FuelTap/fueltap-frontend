import { z } from "zod";

export const supportFormSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  type: z.string().min(1, "Type is required"),
  message: z
    .string()
    .min(20, "Minimum of 20 characters is required")
    .max(1000, "Maximum of 1000 characters is required"),
});

export type SupportFormInput = z.infer<typeof supportFormSchema>;
