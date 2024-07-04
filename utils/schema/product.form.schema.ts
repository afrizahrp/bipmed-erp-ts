import { z } from 'zod';

export const productFormSchema = z.object({
  images: z.object({ imageURL: z.string() }).array(),
  catalog_id: z.string().min(5).or(z.literal('')),
  registered_id: z.string().min(5).or(z.literal('')),
  id: z.string().min(5).or(z.literal('')).optional(),
  name: z.string().min(5, { message: 'Product name is required' }), // {message: 'Name must be at least 5 characters long'
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().min(5).or(z.literal('')),
  uom_id: z.string().min(5).or(z.literal('')),
  brand_id: z.string().min(5).or(z.literal('')),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  ecatalog_URL: z.string().min(5).or(z.literal('')),
  iStatus: z.boolean().default(true),
  remarks: z.string().min(5).or(z.literal('')).optional(),
  slug: z.string().min(5).or(z.literal('')).optional(),
  isMaterial: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
