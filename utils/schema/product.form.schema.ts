import { z } from 'zod';

export const productFormSchema = z.object({
  images: z.object({ imageURL: z.string() }).array(),

  // images: z.array(
  //   z.object({
  //     imageURL: z.object({
  //       id: z.string(),
  //       product_id: z.string(),
  //       imageURL: z.string().nullable(),
  //     }),
  //   })
  // ),
  catalog_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  registered_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'Material name is required' }), // {message: 'Name must be at least 5 characters long'
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  uom_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  brand_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  ecatalog_URL: z.string().min(5).or(z.literal('')).optional().nullable(),
  iStatus: z.boolean().default(false).optional(),
  remarks: z.string().min(5).or(z.literal('')).optional(),
  isMaterial: z.boolean().default(false).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
