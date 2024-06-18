import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryForm } from './components/category-form';

const CategoryPage = async ({
  params,
}: {
  params: {
    id: string;
    type: string;
  };
}) => {
  const category = await prisma.categories.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categoryType: true,
    },
  });

  const categoryTypes = await prisma.categoryTypes.findMany({
    where: {
      id: params.type,
    },
  });

  return (
    <Card className='py-6'>
      <CardContent>
        <CategoryForm
          categoryTypes={categoryTypes}
          initialData={category || undefined}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryPage;
