import { z } from 'zod';

export const UpdateProduct = z.object({
  id: z.string(),
  name: z.optional(
    z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description is required',
      })
      .min(3, {
        message: 'Description is too short.',
      })
  ),
});
