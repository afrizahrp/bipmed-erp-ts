import { z } from 'zod';

export const productImageFormSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  imageURL: z.string(),
  isPrimary: z.boolean(),
});

export type ProductImageFormValues = z.infer<typeof productImageFormSchema>;
