import { BillboardFormValues } from '@/utils/schema/billboard.form.schema';

export function billboarddefaultValues(
  initialBillboardData?: BillboardFormValues
) {
  return {
    section: initialBillboardData?.section ?? 0,
    title: initialBillboardData?.title ?? '',
    description: initialBillboardData?.description ?? '',
    isImage: initialBillboardData?.isImage ?? true,
    contentURL: initialBillboardData?.contentURL ?? '',
    content_id: initialBillboardData?.content_id ?? '',
    btnText: initialBillboardData?.btnText ?? '',
    iStatus: initialBillboardData!.iStatus ?? true,
    iShowedStatus: initialBillboardData!.iShowedStatus ?? false,
    isShowBtn: initialBillboardData?.isShowBtn ?? false,
    remarks: initialBillboardData?.remarks ?? '',
  };
}
