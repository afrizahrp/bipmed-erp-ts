import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { SubCategoryForm } from './components/subcategory-form';

const SubCategoryPage = async ({
  params,
}: {
  params: {
    id: string;
    type: string;
  };
}) => {
  const subCategory = await prisma.subCategories.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
    },
  });

  const categoryTypes = await prisma.categoryTypes.findMany({
    where: {
      id: params.type,
    },
  });

  const categories = await prisma.categories.findMany({});

  return (
    <Card className='py-6'>
      <CardContent>
        <SubCategoryForm
          initialData={subCategory || undefined}
          categoryTypes={categoryTypes}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};

export default SubCategoryPage;
