import { z } from 'zod';
// import { messages } from '@/config/messages';
// import { fileSchema } from '@/utils/validators/common-rules';
// import { create, update } from 'lodash';

export const productSpecFormSchema = z.object({
  /* general section */

  /* specification section */

  id: z.string().min(5).or(z.literal('')),
  construction: z.string().min(5).or(z.literal('')),
  base: z.string().min(5).or(z.literal('')),
  bodyFrame: z.string().min(5).or(z.literal('')),

  itemFunctions: z.string(),
  item_type: z.string(),
  item_model: z.string(),
  expired_at: z.date(),
  mattress: z.string(),
  mattressSize: z.string(),
  mattressThickness: z.string(),
  finishing: z.string(),
  dimension: z.string(),
  powerSupply: z.string(),
  loadCapacity: z.string(),
  systemFilter: z.string(),
  accessories: z.string(),
  sideRail: z.string(),
  ivStand: z.string(),
  wheels: z.string(),
  maxLoad: z.string(),
  size: z.string(),
  weight: z.string(),
  standSize: z.string(),
  position: z.string(),
  basePlate: z.string(),
  cover: z.string(),
  material: z.string(),
  coverMaterial: z.string(),
  typeScreen: z.string(),
  powerConsumption: z.string(),
  lamp: z.string(),
  movers: z.string(),
  rim: z.string(),
  custodyFeet: z.string(),
  foot: z.string(),
  footWear: z.string(),
  pole: z.string(),
  inputVoltage: z.string(),
  outputVoltage: z.string(),
  sideGuard: z.string(),
  footandheadPanel: z.string(),
  temperatureControl: z.string(),
  top: z.string(),
  foodTray: z.string(),
  traycorpse: z.string(),
  pillowthecorpse: z.string(),
  lightPole: z.string(),
  sterilizing: z.string(),
  filter: z.string(),
  underPressure: z.string(),
  foundationTray: z.string(),
  door: z.string(),
  handle: z.string(),
  medicineBox: z.string(),
  handleTrolley: z.string(),
  drawer: z.string(),
  systemControl: z.string(),
  bodyFrameWork: z.string(),
  remarks: z.string(),
});

export type ProductSpecFormValues = z.infer<typeof productSpecFormSchema>;
