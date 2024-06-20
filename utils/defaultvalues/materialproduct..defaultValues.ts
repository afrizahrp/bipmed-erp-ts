import { MaterialProductFormValues } from '@/utils/schema/materialproduct.form.schema';

export function defaultValues(initialData?: MaterialProductFormValues) {
  return {
    // images: initialData?.images ?? [],
    id: initialData?.id,
    name: initialData?.name ?? '',
    catalog_id: initialData?.catalog_id || undefined,
    registered_id: initialData?.registered_id || undefined,
    category_id: initialData?.category_id || undefined,
    subCategory_id: initialData?.subCategory_id || undefined,
    brand_id: initialData?.brand_id || undefined,
    uom_id: initialData?.uom_id || undefined,
    tkdn_pctg: initialData?.tkdn_pctg ?? 0,
    bmp_pctg: initialData?.bmp_pctg ?? 0,
    ecatalog_URL: initialData?.ecatalog_URL || undefined,
    iStatus: initialData?.iStatus ?? false,
    remarks: initialData?.remarks || undefined,
    slug: initialData?.slug || undefined,
    isMaterial: initialData?.isMaterial ?? true,
    iShowedStatus: initialData?.iShowedStatus ?? false,
  };
}
