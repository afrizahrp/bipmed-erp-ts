'use client';
import { DataTable } from '@/components/ui/data-table';
import { CertficateColumns, columns } from './components/columns';

interface CertficateProps {
  data: CertficateColumns[];
}

export const CategoryListTable: React.FC<CertficateProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href="#"
        hrefText="none"
        pageName="certificate-web"
      />
    </div>
  );
};
