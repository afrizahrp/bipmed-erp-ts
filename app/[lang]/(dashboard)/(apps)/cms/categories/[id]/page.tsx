import { prisma } from '@/lib/client';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
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
      showStatus: true,
      images: true,
    },
  });

  const pageHeader = {
    title: category ? 'Edit category' : 'New category',
    breadcrumb: [
      {
        name: 'Dashboard',
        href: routes.inventory.dashboard,
      },
      {
        name: 'List',
        href: routes.inventory.categories,
      },
      {
        name: category ? 'Edit category' : 'New category',
      },
    ],
  };

  const categoryTypes = await prisma.categoryTypes.findMany({
    where: {
      id: params.type,
    },
  });

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Card className='py-6'>
        <CardContent>
          <CategoryForm categoryTypes={categoryTypes} initialData={category} />
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryPage;
