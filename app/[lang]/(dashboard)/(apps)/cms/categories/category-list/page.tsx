import { prisma } from '@/lib/client';
import { CategoryListTable } from './category-list-table';
import { CategoryColumns } from './category-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Category List',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'Finish Goods Active Category List',
    },
  ],
};

const CategoryListPage = async () => {
  const categories = await prisma.categories.findMany({
    where: {
      iStatus: true,
      type: '1',
    },
    include: {
      categoryType: true,
      images: true,
      status: true,
      showStatus: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumns[] =
    categories?.map((item) => ({
      id: item.id,
      name: item.name,
      iShowedStatus: item.iShowedStatus, // Add type assertion to ensure iShowedStatus is always a boolean
      showStatus: item.showStatus?.name,
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
