'use client';
import { DataTable } from '@/components/ui/data-table';
import { ProductColumn, columns } from './columns';
import { routes } from '@/config/routes';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { ApiList } from '@/components/ui/api-list';
// import { useSession } from 'next-auth/react';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductListTable: React.FC<ProductsClientProps> = ({ data }) => {
  // const userName = useSession().data?.user?.name;
  // const authorized = userName === 'afriza';
  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={data}
          href={routes.inventory.newProduct}
          hrefText='none'
          pageName='product-web'
        />
      </div>
      {/* {authorized && (
        <div>
          <Heading title='API' description='API Calls for Products' />
          <Separator />
          <ApiList entityName='cms/products' entityIdName='id' />
        </div>
      )} */}
    </>
  );
};
