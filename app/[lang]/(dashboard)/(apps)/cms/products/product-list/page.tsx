import { prisma } from '@/lib/client';
import { ProductListTable } from './product-list-table/components';
import { ProductColumn } from './product-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Product List',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'Active Product List',
    },
  ],
};
const ProductListPage = async () => {
  const products = await prisma.products.findMany({
    where: {
      isMaterial: false,
      iStatus: true,
    },
    include: {
      brand: true,
      category: true,
      status: true,
      uom: true,
      images: true,
      showStatus: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] =
    products?.map((item) => ({
      id: item.id,
      catalog: item.catalog_id ?? '',
      name: item.name ?? '',
      iShowedStatus: item.iShowedStatus as boolean, // Type assertion for boolean
      showStatus: item.showStatus?.name,
      catalog_id: item.catalog_id ?? '',
      category_id: item.category_id ?? '',
      category: item.category?.name || ('' as string), // Type assertion for string
      brand: item.brand?.name || '',
      uom: item.uom?.name || '',
      remarks: item.remarks,
      images: [
        item.images.find((image) => image.isPrimary === true)?.imageURL || '',
      ],

      // images: item.images
      //   .map((image) => ({
      //     imageURL: image.imageURL,
      //     isPrimary: image.isPrimary,
      //   }))
      //   .map((image) => image.imageURL || ''),
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
