import { ProductFormValues } from '@/utils/schema/product.form.schema';

export function productdefaultValues(initialData?: ProductFormValues) {
  return {
    images: initialData?.images || [],
    id: initialData?.id,
    name: initialData?.name ?? '',
    catalog_id: initialData?.catalog_id ?? '',
    registered_id: initialData?.registered_id ?? '',
    category_id: initialData?.category_id ?? '',
    subCategory_id: initialData?.subCategory_id ?? '',
    brand_id: initialData?.brand_id ?? '',
    uom_id: initialData?.uom_id ?? '',
    tkdn_pctg: initialData?.tkdn_pctg ?? 0,
    bmp_pctg: initialData?.bmp_pctg ?? 0,
    ecatalog_URL: initialData?.ecatalog_URL ?? '',
    iStatus: initialData?.iStatus ?? false,
    remarks: initialData?.remarks || undefined,
    isMaterial: initialData?.isMaterial ?? false,
  };
}
