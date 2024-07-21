import { z } from 'zod';

export const productDescsFormSchema = z.object({
  id: z.string(),
  title: z.string().or(z.literal('')),
  descriptions: z.string().min(5).or(z.literal('')),
  features: z.string().or(z.literal('')),
  footers: z.string().or(z.literal('')),
});

export type ProductDescsFormValues = z.infer<typeof productDescsFormSchema>;
