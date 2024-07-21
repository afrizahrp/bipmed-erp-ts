import { ProductDescsFormValues } from '@/utils/schema/product.descs.form.schema';

export function productdescsdefaultValues(
  initialProductDescsData?: ProductDescsFormValues
) {
  return {
    id: initialProductDescsData?.id ?? undefined,
    title: initialProductDescsData?.title ?? '',
    descriptions: initialProductDescsData?.descriptions ?? '',
    features: initialProductDescsData?.features ?? '',
    footers: initialProductDescsData?.footers ?? '',
  };
}
