import { prisma } from '@/lib/client';
import { ProductListTable } from './product-list-table/components';
import { ProductColumn } from './product-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { Plus } from 'lucide-react';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Inventory',

      href: routes.eCommerce.dashboard,
    },
    {
      name: 'List',
    },
  ],
};
const ProductListPage = async () => {
  const products = await prisma.products.findMany({
    where: {
      isMaterial: false,
    },
    include: {
      brand: true,
      category: true,
      subCategory: true,
      status: true,
      uom: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] =
    products?.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      catalog: item.catalog_id,
      category: item.category?.name,
      subcategory: item.subCategory?.name,
      brand: item.brand?.name,
      status: item.status?.name,
      uom: item.uom?.name,
      remarks: item.remarks,
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className='mt-6'>
          {/* <div className='mt-4 flex justify-end gap-3 @lg:mt-0'>
            <Button>
              <Plus className='mr-2 h-4 w-4' /> New Product
            </Button>
          </div> */}
          <CardContent className='p-10'>
            <ProductListTable data={formattedProducts} />
            {/* <ProductListPage /> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductListPage;
