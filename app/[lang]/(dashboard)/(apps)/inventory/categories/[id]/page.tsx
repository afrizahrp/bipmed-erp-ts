import { prisma } from '@/LIB/client';
import { CategoryForm } from './components/category-form';

const ProductPage = async ({
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
    <div className='flex-col'>
      <div className='flex-1 space-y-1 p-5 pt-1 overflow-hidden'>
        <CategoryForm
          categoryTypes={categoryTypes}
          initialData={category || undefined}
        />
      </div>
    </div>
  );
};

export default ProductPage;
