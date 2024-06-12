import { z } from 'zod';

export const materialFormSchema = z.object({
  id: z.string().min(5).or(z.literal('')).optional().nullable(),
  category_id: z.string().min(3, { message: 'Category is required' }),
  subCategory_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  brand_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  catalog_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  name: z.string().min(5, { message: 'Material name is required' }), // {message: 'Name must be at least 5 characters long'
  uom_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  registered_id: z.string().min(5).or(z.literal('')).optional().nullable(),
  remarks: z.string().min(5).or(z.literal('')).optional().nullable(),
  iStatus: z.boolean().default(false).optional(),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  ecatalog_URL: z.string().min(5).or(z.literal('')).optional().nullable(),
});

export type MaterialFormValues = z.infer<typeof materialFormSchema>;

// type ProductFormValues = z.infer<typeof formSchema>;
