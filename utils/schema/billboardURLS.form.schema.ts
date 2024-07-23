import { z } from 'zod';

export const billboardURLSFormSchema = z.object({
    id: z.string() ?? '',
    billboard_id: z.string().min(5).or(z.literal('')),
    contentURL: z.string().or(z.array(z.string())),
    isPrimary: z.boolean().optional(),
});

export type BillboardURLSFormValues = z.infer<typeof billboardURLSFormSchema>;
