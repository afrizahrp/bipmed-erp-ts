import { z } from 'zod';

export const billboardFormSchema = z.object({
  id: z.string().min(5).or(z.literal('')),
  section: z.coerce.number().min(1),
  title: z.string().min(5).or(z.literal('')),
  description: z.string().min(5).or(z.literal('')),
  isImage: z.boolean().optional().default(true),
  contentURL: z.string().min(5).or(z.literal('')),
  content_id: z.string().min(5).or(z.literal('')),
  iStatus: z.boolean().default(true),
  iShowedStatus: z.boolean().optional().default(false),
  isShowBtn: z.boolean().default(false),
  btnText: z.string().or(z.literal('')),
  remarks: z.string().or(z.literal('')),
  // contents: z.object({ contentURL: z.string() }).array().optional(),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;
