import { z } from 'zod';
import { messages } from '@/config/messages';

export const supplierFormSchema = z.object({
  name: z.string().min(5, { message: messages.nameIsRequired }),
  address: z.string().optional(),
  supplier_type: z
    .string()
    .min(3, { message: messages.supplierTypeIsRequired }),
  href: z.string().optional(),
  contact_person: z
    .string()
    .min(5, { message: messages.contactPersonIsRequired }),
  primary_mobileNo: z.string().optional(),
  secondary_mobileNo: z.string().optional(),
  iStatus: z.boolean().optional(),
  credit_term: z.number().min(0, { message: messages.invalidCreditTerm }),
  // email: z.string().email({ message: messages.invalidEmail }),
  tel_no: z.string().optional(),
  post_cd: z.string().optional(),
  remarks: z.string().optional(),
  currency_cd: z.string().min(3, { message: messages.currencyIsRequired }),
  fax_no: z.string().optional(),
  // company: z.string().optional(),
  // branch: z.string().optional(),
  // createdBy: z.string().optional(),
  // updatedBy: z.string().optional(),
  // iStatus: z.number().optional(),
  // status: z.string().optional(),
  // createdAt: z.string().optional(),
  // updatedAt: z.string().optional(),
});

// generate form types from zod validation schema
export type SupplierFormInput = z.infer<typeof supplierFormSchema>;
