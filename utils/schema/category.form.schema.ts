import { z } from 'zod';

export const categoryFormSchema = z.object({
  imageURL: z.string().min(5).or(z.literal('')).optional().nullable(),
  id: z.string().min(5).or(z.literal('')),
  type: z.string().min(1, { message: 'Type is required' }),

  // type: z.string().min(1),


  name: z.string().min(5, { message: 'Caetegory name is required' }), // {message: 'Name must be at least 5 characters long'
  remarks: z.string().min(5).or(z.literal('')).optional(),
  iStatus: z.boolean().default(false).optional(),
  icon: z.string().min(5).or(z.literal('')).optional().nullable(),
  href: z.string().min(5).or(z.literal('')).optional().nullable(),
  slug: z.string().min(5).or(z.literal('')).optional().nullable(),
  // createdBy: z.string().min(5).or(z.literal('')).optional().nullable(),
  // createdAt: z.date(),
  // updatedBy: z.string().min(5).or(z.literal('')).optional().nullable(),
  // updatedAt: z.date(),
  // company: z.string().min(5).or(z.literal('')).optional().nullable(),
  // branch: z.string().min(5).or(z.literal('')).optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
