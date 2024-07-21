import { ProductFormValues } from '../schema/product.form.schema';
import { ProductSpecFormValues } from '../schema/productSpec.form.schema';
import { ProductDescsFormValues } from '../schema/product.descs.form.schema';

export function defaultValues(
  initialProductData: ProductFormValues,
  initialProductDescsData: ProductDescsFormValues,
  initialProductSpectData: ProductSpecFormValues
) {
  return {
    ...initialProductData,
    images: initialProductData?.images || [],
    ...initialProductDescsData,
    ...initialProductSpectData,
  };
}
