import { z } from 'zod';

export const subCategoryFormSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  category_id: z.string().min(3, { message: 'Category is required' }),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'subCategory name is required' }), // {message: 'Name must be at least 5 characters long'
  remarks: z.string().min(5).or(z.literal('')).optional(),
  iStatus: z.boolean().default(false).optional(),
});

export type SubCategoryFormValues = z.infer<typeof subCategoryFormSchema>;
