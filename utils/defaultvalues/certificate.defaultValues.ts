import { CertificatesFormValues } from '@/utils/schema/certificate.form.schema';

export function certificatedefaultValues(initialCertificateData?: CertificatesFormValues) {
  return {
    images: initialCertificateData?.images || [],
    id: initialCertificateData?.id ?? '',
    name: initialCertificateData?.name ?? '',
    iStatus: initialCertificateData?.iStatus ?? true,
    iShowedStatus: initialCertificateData?.iShowedStatus ?? false,
  };
}


