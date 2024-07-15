import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { SubCategoryForm } from './components/subcategory-form';

const SubCategoryPage = async ({
  params,
}: {
  params: {
    id: string;
    // type: string;
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

  return (
    <Card className='py-6'>
      <CardContent>
        <SubCategoryForm initialData={subCategory || undefined} />
      </CardContent>
    </Card>
  );
};

export default SubCategoryPage;
