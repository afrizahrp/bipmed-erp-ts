'use client';
import { DataTable } from '@/components/ui/data-table';
import { PriceListColumn, columns } from './columns';
import { routes } from '@/config/routes';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { ApiList } from '@/components/ui/api-list';
// import { useSession } from 'next-auth/react';

interface PricelistProps {
  data: PriceListColumn[];
}

export const PriceListTable: React.FC<PricelistProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.cms.newPricelist}
        hrefText='New Price List'
        pageName='product-web'
      />
    </div>
  );
};
