

import { prisma } from '@/lib/client';
import { MaterialForm } from '../[id]/components/material-form';
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

export default async function NewMaterialPage() {
  const categoryList = await prisma.categories.findMany({
    where: {
      type: '0',
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
          <MaterialForm
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
