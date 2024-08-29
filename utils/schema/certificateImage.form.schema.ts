import { z } from 'zod';

export const certificateImagesFormSchema = z.object({
  id: z.string() ?? '',
  certificate_id: z.string() ?? '',
  imageURL: z.string().or(z.array(z.string())),
});

export type CertificateImagesFormValues = z.infer<typeof certificateImagesFormSchema>;
