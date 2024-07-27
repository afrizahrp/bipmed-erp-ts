import { z } from 'zod';

export const billboardFormSchema = z.object({
  // contents: z.object({ contentURL: z.string() }).array().optional(),

  section: z.coerce.number().min(0),
  title: z.string().min(5).or(z.literal('')),
  description: z.string().min(5).or(z.literal('')),
  isImage: z.boolean().optional().default(true),
  contentURL: z.string().optional(),
  content_id: z.string().or(z.literal('')),
  iShowedStatus: z.boolean().optional().default(false),
  iStatus: z.boolean().default(true),
  isShowBtn: z.boolean().default(false),
  btnText: z.string().or(z.literal('')),
  remarks: z.string().or(z.literal('')),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;
