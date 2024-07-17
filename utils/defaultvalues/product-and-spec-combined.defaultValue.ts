import { ProductFormValues } from '../schema/product.form.schema';
import { ProductSpecFormValues } from '../schema/productSpec.form.schema';

export function defaultValues(
  initialProductData: ProductFormValues,
  initialProductSpectData: ProductSpecFormValues
) {
  const specRemarks = initialProductSpectData?.remarks ?? '';
  // const productId = initialData?.id ?? '';
  return {
    ...initialProductData,
    images: initialProductData?.images || [],

    ...initialProductSpectData,
  };
}
