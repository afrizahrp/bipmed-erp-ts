import { z } from 'zod';

export const billboardFormSchema = z.object({
    contents: z.object({ contentURL: z.string() }).array().optional(),
    name: z.string().min(5).or(z.literal('')),
    section: z.coerce.number().min(0),
    title: z.string().min(5).or(z.literal('')),
    description: z.string().min(5).or(z.literal('')),
    iStatus: z.boolean().default(true),
    iShowedStatus: z.boolean().optional().default(false),
    isImage: z.boolean().default(false),
    isShowBtn: z.boolean().default(false),
    btnText: z.string().or(z.literal('')),
    remarks: z.string().or(z.literal('')),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;
