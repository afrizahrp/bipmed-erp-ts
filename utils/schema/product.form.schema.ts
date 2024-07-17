import { z } from 'zod';

export const productFormSchema = z.object({
  // images: z.object({ imageURL: z.string() }).array(),
  images: z.object({ imageURL: z.string() }).array().optional(),
  catalog_id: z.string().min(5).or(z.literal('')),
  registered_id: z.string().min(5).or(z.literal('')),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'Product name is required' }), // {message: 'Name must be at least 5 characters long'
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().optional().nullable(),
  uom_id: z.string().optional().nullable(),
  brand_id: z.string().optional().nullable(),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  ecatalog_URL: z.string().min(5).or(z.literal('')),
  iStatus: z.boolean().default(true),
  remarks: z.string().min(5).or(z.literal('')),
  slug: z.string().min(5).or(z.literal('')),
  isMaterial: z.boolean().default(false),
  iShowedStatus: z.boolean().optional().nullable(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
