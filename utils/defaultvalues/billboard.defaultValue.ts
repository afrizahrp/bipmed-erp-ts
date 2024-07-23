import { BillboardFormValues } from '@/utils/schema/billboard.form.schema';

export function billboarddefaultValues(
  initialBillboardData?: BillboardFormValues
) {
  return {
    id: initialBillboardData?.id || 0,
    contents: initialBillboardData?.contents || [],
    name: initialBillboardData?.name ?? '',
    description: initialBillboardData?.description ?? '',
    title: initialBillboardData?.title ?? '',
    section: initialBillboardData?.section ?? 0,
    isImage: initialBillboardData?.isImage ?? false,
    btnText: initialBillboardData?.btnText ?? '',
    isShowBtn: initialBillboardData?.isShowBtn ?? false,
    iShowedStatus: initialBillboardData?.iShowedStatus ?? false,
    iStatus: initialBillboardData?.iStatus ?? true,
    remarks: initialBillboardData?.remarks ?? '',
  };
}
