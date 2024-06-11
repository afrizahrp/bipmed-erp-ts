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
  images: z.object({ imageURL: z.string() }).array().optional(),
  isMaterial: z.boolean().default(false).optional(),
  slug: z.string().min(5).optional().nullable(),
  iShowedStatus: z.boolean().default(false).optional(),

  /* specification section */

  // construction: z.string().min(5).or(z.literal('')).optional().nullable(),
  // base: z.string().min(5).or(z.literal('')).optional().nullable(),
  // bodyFrame: z.string().min(5).or(z.literal('')).optional().nullable(),

  // itemFunctions: z.string().optional().nullable(),
  // item_type: z.string().optional().nullable(),
  // item_model: z.string().optional().nullable(),
  // expired_at: z.string().optional().nullable(),
  // mattress: z.string().optional().nullable(),
  // mattressSize: z.string().optional().nullable(),
  // mattressThickness: z.string().optional().nullable(),
  // finishing: z.string().optional().nullable(),
  // dimension: z.string().optional().nullable(),
  // powerSupply: z.string().optional().nullable(),
  // loadCapacity: z.string().optional().nullable(),
  // systemFilter: z.string().optional().nullable(),
  // accessories: z.string().optional().nullable(),
  // sideRail: z.string().optional().nullable(),
  // ivStand: z.string().optional().nullable(),
  // wheels: z.string().optional().nullable(),
  // maxLoad: z.string().optional().nullable(),
  // size: z.string().optional().nullable(),
  // weight: z.string().optional().nullable(),
  // standSize: z.string().optional().nullable(),
  // position: z.string().optional().nullable(),
  // basePlate: z.string().optional().nullable(),
  // cover: z.string().optional().nullable(),
  // material: z.string().optional().nullable(),
  // coverMaterial: z.string().optional().nullable(),
  // typeScreen: z.string().optional().nullable(),
  // powerConsumption: z.string().optional().nullable(),
  // lamp: z.string().optional().nullable(),
  // movers: z.string().optional().nullable(),
  // rim: z.string().optional().nullable(),
  // custodyFeet: z.string().optional().nullable(),
  // foot: z.string().optional().nullable(),
  // footWear: z.string().optional().nullable(),
  // pole: z.string().optional().nullable(),
  // inputVoltage: z.string().optional().nullable(),
  // outputVoltage: z.string().optional().nullable(),
  // sideGuard: z.string().optional().nullable(),
  // footandheadPanel: z.string().optional().nullable(),
  // temperatureControl: z.string().optional().nullable(),
  // top: z.string().optional().nullable(),
  // foodTray: z.string().optional().nullable(),
  // traycorpse: z.string().optional().nullable(),
  // pillowthecorpse: z.string().optional().nullable(),
  // lightPole: z.string().optional().nullable(),
  // sterilizing: z.string().optional().nullable(),
  // filter: z.string().optional().nullable(),
  // underPressure: z.string().optional().nullable(),
  // foundationTray: z.string().optional().nullable(),
  // door: z.string().optional().nullable(),
  // handle: z.string().optional().nullable(),
  // medicineBox: z.string().optional().nullable(),
  // handleTrolley: z.string().optional().nullable(),
  // drawer: z.string().optional().nullable(),
  // systemControl: z.string().optional().nullable(),
  // bodyFrameWork: z.string().optional().nullable(),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;

// type ProductFormValues = z.infer<typeof formSchema>;
