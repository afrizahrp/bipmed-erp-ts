'use client';
import { DataTable } from '@/components/ui/data-table';
import { CertificateColumn, columns } from './components/columns';
import { routes } from '@/config/routes';

interface CertificateProps {
  data: CertificateColumn[];
}

export const CertificateListTable: React.FC<CertificateProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.cms.newcertificate}
        hrefText="New Certificate"
        pageName="certificate"
      />
    </div>
  );
};
