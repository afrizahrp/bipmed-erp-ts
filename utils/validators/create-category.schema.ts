import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// form zod validation schema
export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: messages.catNameIsRequired }),
  // slug: z.string().min(1, { message: messages.slugIsRequired }),
  iStatus: z.boolean().optional(),

  // iGroupType: z.number().min(0, { message: messages.invalidCreditTerm }),

  GroupType: z.string().optional(),
  remarks: z.string().optional(),
  // imageURL: z.string().optional(),
  imageURL: z.string().optional(),
});

// generate form types from zod validation schema
export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
