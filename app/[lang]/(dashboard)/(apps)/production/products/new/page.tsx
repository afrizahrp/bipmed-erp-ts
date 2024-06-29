// import Link from 'next/link';
// import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
// import PageHeader from '@/components/page-header';
// import { Button } from '@/components/ui/button_T';
// import { Plus } from 'lucide-react';

// import ProductDetailPage from '../[id]/components';
import { prisma } from '@/lib/client';
import { ProductForm } from '../[id]/components/product-form';
import { Card, CardContent } from '@/components/ui/card';

// export const metadata = {
//   ...metaObject('Create Product'),
// };

// const pageHeader = {
//   title: 'New Product',
//   breadcrumb: [
//     {
//       name: 'Inventory',
//     },
//     {
//       name: 'Products',
//       href: routes.inventory.products,
//     },
//     {
//       name: 'New',
//     },
//   ],
// };

export default async function NewProductPage() {
  const categoryList = await prisma.categories.findMany({
    where: {
      type: '1',
      iStatus: false,
    },
  });

  const subCategoryList = await prisma.subCategories.findMany({
    where: {
      iStatus: false,
    },
  });

  const brandList = await prisma.brands.findMany({
    where: {
      iStatus: false,
    },
  });

  const uomList = await prisma.uoms.findMany({
    where: {
      iStatus: false,
    },
  });

  return (
    <>
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}
      <Card className='py-6'>
        <CardContent>
          <ProductForm
            initialData={null}
            categories={categoryList}
            subCategories={subCategoryList}
            brands={brandList}
            uoms={uomList}
          />
        </CardContent>
      </Card>
      {/* <ProductDetailPage
        initialData={null}
        categories={categoryList}
        subCategories={subCategoryList}
        brands={brandList}
        uoms={uomList}
      /> */}
    </>
  );
}
