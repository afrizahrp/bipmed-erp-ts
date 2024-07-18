// 'use client'
import { DataTable } from '@/components/ui/data-table';
import { FinishGoodsColumn, columns } from './columns';
import { routes } from '@/config/routes';

interface ProductsClientProps {
  data: FinishGoodsColumn[];
}

export const FinishGoodsListTable: React.FC<ProductsClientProps> = ({
  data,
}) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.production.newfinishgoods}
        hrefText='New Product'
        pageName='product'
      />
    </div>
  );
};
