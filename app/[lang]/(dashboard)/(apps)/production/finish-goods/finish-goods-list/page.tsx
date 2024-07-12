import { prisma } from '@/lib/client';
import { FinishGoodsListTable } from './finish-goods-list-table/components';
import { FinishGoodsColumn } from './finish-goods-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Finish Goods',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.production.dashboard,
    },
    {
      name: 'List',
    },
  ],
};
const FinishGoodsListPage = async () => {
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
      images: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedProducts: FinishGoodsColumn[] =
    products?.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      catalog: item.catalog_id ?? '',
      catalog_id: item.catalog_id ?? '',
      category_id: item.category_id ?? '',
      category: item.category?.name || '', // Add type assertion to ensure category is always a string
      subcategory: item.subCategory?.name || '',
      brand: item.brand?.name || '',
      iStatus: item.iStatus, // Add type assertion to ensure iStatus is always a boolean
      status: item.status?.name || '',
      uom: item.uom?.name || '',
      remarks: item.remarks,
      images: item.images.map((image) => image.imageURL),
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <FinishGoodsListTable data={formattedProducts} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FinishGoodsListPage;
