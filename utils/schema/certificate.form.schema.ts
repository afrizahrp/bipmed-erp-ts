import { z } from 'zod';

export const certificatesFormSchema = z.object({
  images: z.object({ imageURL: z.string() }).array().optional(),
  id: z.string().min(5).or(z.literal('')),
  name: z.string().min(5, { message: 'certificates name is required' }),
  remarks: z.string().min(5).or(z.literal('')),
  iStatus: z.boolean().default(true),
  iShowedStatus: z.boolean().default(false),
  // {message: 'Name must be at least 5 characters long'  
});

export type CertificatesFormValues = z.infer<typeof certificatesFormSchema>;
