import { prisma } from '@/lib/client';
import { SubCategoryListTable } from './subcategory-list-table';
import { SubCategoryColumns } from './subcategory-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'SubCategories',
  breadcrumb: [
    {
      name: 'Home',
      href: routes.inventory.dashboard,
    },
    {
      name: 'Inventory',
      href: routes.inventory.dashboard,
    },
    {
      name: 'List',
    },
  ],
};

const SubCategoriesPage = async () => {
  const subcategories = await prisma.subCategories.findMany({
    include: {
      category: true,
      status: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // const categories = await prisma.categories.findMany({
  //   include: {
  //     categoryType: true,
  //     status: true,
  //   },
  //   orderBy: {
  //     updatedAt: 'desc',
  //   },
  // })

  const formattedSubCategories: SubCategoryColumns[] =
    subcategories?.map((item) => ({
      id: item.id,
      name: item.name,
      category: item?.category?.name, // Add the 'category' property
      status: item?.status?.name, // Add the 'status' property
      remarks: item?.remarks,
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <SubCategoryListTable data={formattedSubCategories} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SubCategoriesPage;
