import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { SubCategoryForm } from './components/subcategory-form';

const SubCategoryPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const subCategory = await prisma.subCategories.findUnique({
    where: {
      id: params.id,
    },
  });

  const categories = await prisma.categories.findMany({});

  return (
    <Card className='py-6'>
      <CardContent>
        <SubCategoryForm
          initialData={subCategory || undefined}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};

export default SubCategoryPage;
