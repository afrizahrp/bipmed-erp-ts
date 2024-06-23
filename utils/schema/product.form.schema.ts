import { z } from 'zod';

export const productFormSchema = z.object({
  images: z.object({ imageURL: z.string() }).array(),
  catalog_id: z.string().min(5).or(z.literal('')),
  registered_id: z.string().min(5).or(z.literal('')),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'Product name is required' }), // {message: 'Name must be at least 5 characters long'
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().min(5).or(z.literal('')),
  uom_id: z.string().min(5).or(z.literal('')),
  brand_id: z.string().min(5).or(z.literal('')),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  ecatalog_URL: z.string().min(5).or(z.literal('')),
  iStatus: z.boolean().default(false),
  remarks: z.string().min(5).or(z.literal('')),
  isMaterial: z.boolean().default(false),
  slug: z.string().min(5).or(z.literal('')),
  iShowedStatus: z.boolean().default(false),
  createdBy: z.string().min(5).or(z.literal('')),
  createdAt: z.date(),
  updatedBy: z.string().min(5).or(z.literal('')),
  updatedAt: z.date(),
  company: z.string().min(5).or(z.literal('')),
  branch: z.string().min(5).or(z.literal('')),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
