import { z } from 'zod';

export const materialproductFormSchema = z.object({
  catalog_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'Material name is required' }), // {message: 'Name must be at least 5 characters long'
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  uom_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  brand_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  iStatus: z.boolean().default(false).optional(),
  remarks: z.string().min(5).or(z.literal('')).optional(),
  isMaterial: z.boolean().default(true).optional(),
  // slug: z.string().min(5).or(z.literal('')).optional().nullable(),
  // iShowedStatus: z.boolean().default(false).optional(),
  // createdBy: z.string().min(5).or(z.literal('')).optional().nullable(),
  // createdAt: z.date(),
  // updatedBy: z.string().min(5).or(z.literal('')).optional().nullable(),
  // updatedAt: z.date(),
  // company: z.string().min(5).or(z.literal('')).optional().nullable(),
  // branch: z.string().min(5).or(z.literal('')).optional().nullable(),
});

export type MaterialProductFormValues = z.infer<
  typeof materialproductFormSchema
>;

// type ProductFormValues = z.infer<typeof formSchema>;
