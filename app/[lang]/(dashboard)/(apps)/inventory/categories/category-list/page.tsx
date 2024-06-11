'use client';
// import { prisma } from '@/prisma/client';
import useCategories from '@/queryHooks/useCategories';
import { CategoryColumns } from './category-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import  {CategoryListTable}  from './category-list-table';
import LayoutLoader from '@/components/layout-loader';
const CategoryListPage = () => {


  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formattedCategories: CategoryColumns[] =
    categories?.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.categoryType.name ?? [],
      status: item.status.name ?? [],
      remarks: item.remarks,
    })) ?? [];

  return (
    <div>
         <Card className="mt-6">
      <CardContent className="p-10">
      <CategoryListTable data={formattedCategories} />
      </CardContent>
    </Card>
     </div>
  );
};

export default CategoryListPage;
