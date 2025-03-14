import { z } from 'zod';

export const productSpecFormSchema = z.object({
  id: z.string().min(5).or(z.literal('')).optional(),
  construction: z.string().min(5).or(z.literal('')),
  base: z.string().min(5).or(z.literal('')),
  bodyFrame: z.string().min(5).or(z.literal('')),
  itemFunctions: z.string().or(z.literal('')),
  item_type: z.string().or(z.literal('')),
  item_model: z.string().or(z.literal('')),
  mattress: z.string().or(z.literal('')),
  mattressSize: z.string().or(z.literal('')),
  mattressThickness: z.string().or(z.literal('')),
  finishing: z.string().or(z.literal('')),
  dimension: z.string().or(z.literal('')),
  powerSupply: z.string().or(z.literal('')),
  loadCapacity: z.string().or(z.literal('')),
  systemFilter: z.string().or(z.literal('')),
  accessories: z.string().or(z.literal('')),
  sideRail: z.string().or(z.literal('')),
  ivStand: z.string().or(z.literal('')),
  wheels: z.string().or(z.literal('')),
  maxLoad: z.string().or(z.literal('')),
  size: z.string().or(z.literal('')),
  weight: z.string().or(z.literal('')),
  standSize: z.string().or(z.literal('')),
  position: z.string().or(z.literal('')),
  basePlate: z.string().or(z.literal('')),
  cover: z.string().or(z.literal('')),
  material: z.string().or(z.literal('')),
  coverMaterial: z.string().or(z.literal('')),
  typeScreen: z.string().or(z.literal('')),
  powerConsumption: z.string().or(z.literal('')),
  lamp: z.string().or(z.literal('')),
  movers: z.string().or(z.literal('')),
  rim: z.string().or(z.literal('')),
  custodyFeet: z.string().or(z.literal('')),
  foot: z.string().or(z.literal('')),
  footWear: z.string().or(z.literal('')),
  pole: z.string().or(z.literal('')),
  inputVoltage: z.string().or(z.literal('')),
  outputVoltage: z.string().or(z.literal('')),
  sideGuard: z.string().or(z.literal('')),
  footandheadPanel: z.string().or(z.literal('')),
  temperatureControl: z.string().or(z.literal('')),
  top: z.string().or(z.literal('')),
  foodTray: z.string().or(z.literal('')),
  traycorpse: z.string().or(z.literal('')),
  pillowthecorpse: z.string().or(z.literal('')),
  lightPole: z.string().or(z.literal('')),
  sterilizing: z.string().or(z.literal('')),
  filter: z.string().or(z.literal('')),
  underPressure: z.string().or(z.literal('')),
  foundationTray: z.string().or(z.literal('')),
  door: z.string().or(z.literal('')),
  handle: z.string().or(z.literal('')),
  medicineBox: z.string().or(z.literal('')),
  handleTrolley: z.string().or(z.literal('')),
  drawer: z.string().or(z.literal('')),
  systemControl: z.string().or(z.literal('')),
  bodyFrameWork: z.string().or(z.literal('')),
  specremarks: z.string().or(z.literal('')).optional().nullable(),
});

export type ProductSpecFormValues = z.infer<typeof productSpecFormSchema>;
