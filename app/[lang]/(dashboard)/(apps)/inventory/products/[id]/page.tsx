import { prisma } from '@/lib/client';

import { Card, CardContent } from '@/components/ui/card';
import { ProductForm } from './components/product-form';
const ProductPage = async ({
  params,
}: {
  params: {
    id: string;
    category_id: string;
    subCategory_id: string;
    brand_id: string;
    uom_id: string;
  };
}) => {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
    },
  });

  // const productImages = await prisma.productImages.findMany({
  //   where: {
  //     product_id: params.id,
  //   },
  // });

  // const productSpec = await prisma.productSpecs.findUnique({
  //   where: {
  //     id: params.id,
  //   },
  // });

  const categories = await prisma.categories.findMany({
    where: {
      id: params.category_id,
      type: '1',
      iStatus: false,
    },
  });

  const subCategories = await prisma.subCategories.findMany({
    where: {
      category_id: params.category_id,
      id: params.subCategory_id,
    },
  });

  const brands = await prisma.brands.findMany({
    where: {
      id: params.brand_id,
    },
  });

  const uoms = await prisma.uoms.findMany({
    where: {
      id: params.uom_id,
    },
  });

  return (
    <Card className='py-6'>
      <CardContent>
        {/* <ProductDetailPage
          initialData={product}
          categories={categories}
          subCategories={subCategories}
          brands={brands}
          uoms={uoms}
        /> */}

        <ProductForm
          initialData={product}
          categories={categories}
          subCategories={subCategories}
          brands={brands}
          uoms={uoms}
        />
      </CardContent>
    </Card>
  );
};

export default ProductPage;
