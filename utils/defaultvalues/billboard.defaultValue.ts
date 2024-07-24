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
    isImage: initialBillboardData?.isImage ?? true,
    btnText: initialBillboardData?.btnText ?? '',
    iStatus: initialBillboardData!.iStatus ?? true,
    iShowedStatus: initialBillboardData!.iShowedStatus ?? false,
    isShowBtn: initialBillboardData?.isShowBtn ?? false,
    remarks: initialBillboardData?.remarks ?? '',
  };
}
