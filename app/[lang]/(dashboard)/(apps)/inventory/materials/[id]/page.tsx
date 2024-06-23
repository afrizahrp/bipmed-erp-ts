import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialForm } from './components/material-form';
const MaterialPage = async ({
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
  const material = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });

  const categories = await prisma.categories.findMany({
    where: {
      id: params.category_id,
      type: '0',
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
        <MaterialForm
          initialData={material}
          categories={categories ?? ''}
          subCategories={subCategories}
          brands={brands}
          uoms={uoms}
        />
      </CardContent>
    </Card>
  );
};

export default MaterialPage;
