import { prisma } from '@/lib/client';
import { CategoryListTable } from './category-list-table';
import { CategoryColumns } from './category-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Categories',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'List',
    },
  ],
};

const CategoryListPage = async () => {
  const categories = await prisma.categories.findMany({
    include: {
      categoryType: true,
      images: true,
      status: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumns[] =
    categories?.map((item) => ({
      type: item.type,
      categoryType: item.categoryType?.name,
      id: item.id,
      name: item.name,
      iStatus: item.iStatus, // Add type assertion to ensure iStatus is always a boolean
      status: item.status?.name,
      remarks: item?.remarks,
      images: item.images.map((image) => image.imageURL),
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <CategoryListTable data={formattedCategories} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryListPage;
