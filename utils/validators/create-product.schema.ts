import { z } from 'zod';
import { messages } from '@/config/messages';

export const productFormSchema = z.object({
  /* general section */

  id: z.string().optional().nullable(),

  catalog_id: z.string().min(3, { message: messages.catalogIsRequired }),

  category_id: z.string().min(3, { message: messages.subCategoryIsRequired }),

  // subCategory_id: z
  //   .string()
  //   .min(3, { message: messages.subCategoryIsRequired }),
  images: z.object({ imageURL: z.string() }).array().optional(),

  subCategory_id: z.string().refine((value) => value !== '', {
    message: messages.subCategoryIsRequired,
  }),
  brand_id: z.string().min(2, { message: messages.brandIsRequired }), // brand_id

  // name: z.string().min(5, { message: messages.nameIsRequired }),

  name: z.string().refine((value) => value !== '', {
    message: messages.nameIsRequired,
  }),

  uom_id: z.string().min(2, { message: messages.uomIsRequired }),

  registered_id: z.string().min(5).or(z.literal('')).optional(),
  remarks: z.string().min(5).or(z.literal('')).optional(),
  iStatus: z.boolean().default(false).optional(),
  ecatalog_URL: z.string().min(5).or(z.literal('')).optional(),
  tkdn_pctg: z.coerce.number().min(0),
  bmp_pctg: z.coerce.number().min(0),
  isMaterial: z.boolean().default(true).optional(),
  slug: z.string().min(5).optional().nullable(),
  iShowedStatus: z.boolean().default(false).optional(),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;

// type ProductFormValues = z.infer<typeof formSchema>;
