// 'use client'
import { DataTable } from '@/components/ui/data-table';
import { BillboardColumn, columns } from './columns';
import { routes } from '@/config/routes';

interface BillboardsClientProps {
  data: BillboardColumn[];
}

export const BillboardListTable: React.FC<BillboardsClientProps> = ({
  data,
}) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.cms.newBillboard}
        hrefText='none'
        pageName='product-web'
      />
    </div>
  );
};
