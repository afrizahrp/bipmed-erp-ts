import { BillboardURLSFormValues } from '@/utils/schema/billboardURLS.form.schema';

export function billboardURLSdefaultValues(initialBillboardURLSData?: BillboardURLSFormValues) {
    return {
        url: initialBillboardURLSData?.contentURL || [],
        billboard_id: initialBillboardURLSData?.billboard_id ?? '',
        id: initialBillboardURLSData?.id ?? '',
        isPrimary: initialBillboardURLSData?.isPrimary ?? false,
    };
}