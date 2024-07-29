'use client';
import { DataTable } from '@/components/ui/data-table';
import { BillboardColumn, columns } from './columns';
import { routes } from '@/config/routes';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { ApiList } from '@/components/ui/api-list';
// import { useSession } from 'next-auth/react';

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
        hrefText='New Billboard'
        pageName='product-web'
      />
    </div>
  );
};
