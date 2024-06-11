import { prisma } from '@/lib/client';
import { ProductListTable } from './product-list-table/components';
import { ProductColumn } from './product-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

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
      catalog: item.catalog_id ?? '',
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
          <CardContent className='p-10'>
            <ProductListTable data={formattedProducts} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductListPage;
