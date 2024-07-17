import { ProductFormValues } from '@/utils/schema/product.form.schema';

export function productdefaultValues(initialProductData?: ProductFormValues) {
  return {
    images: initialProductData?.images || [],
    catalog_id: initialProductData?.catalog_id ?? '',
    registered_id: initialProductData?.registered_id ?? '',
    id: initialProductData?.id ?? '',
    name: initialProductData?.name ?? '',
    category_id: initialProductData?.category_id ?? '',
    subCategory_id: initialProductData?.subCategory_id ?? '',
    brand_id: initialProductData?.brand_id ?? '',
    uom_id: initialProductData?.uom_id ?? '',
    tkdn_pctg: initialProductData?.tkdn_pctg ?? 0,
    bmp_pctg: initialProductData?.bmp_pctg ?? 0,
    ecatalog_URL: initialProductData?.ecatalog_URL ?? '',
    iStatus: initialProductData?.iStatus ?? true,
    remarks: initialProductData?.remarks ?? '',
    isMaterial: initialProductData?.isMaterial ?? false,
    slug: initialProductData?.slug ?? '',
    iShowedStatus: initialProductData?.iShowedStatus ?? false,
  };
}
