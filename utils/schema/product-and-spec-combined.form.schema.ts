import { z } from 'zod';
import { productFormSchema, ProductFormValues } from './product.form.schema';
import {
  productSpecFormSchema,
  ProductSpecFormValues,
} from './productSpec.form.schema';

export const productAndSpecCombinedSchema = productFormSchema.merge(
  productSpecFormSchema
);

export type CombinedProductFormValues = ProductFormValues &
  ProductSpecFormValues;
