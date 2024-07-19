'use client';
import { DataTable } from '@/components/ui/data-table';
import { CategoryColumns, columns } from './components/columns';
import { routes } from '@/config/routes';

interface CategoriesProps {
  data: CategoryColumns[];
}

export const CategoryListTable: React.FC<CategoriesProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.inventory.newCategory}
        hrefText='New Category'
        pageName='category'
      />
    </div>
  );
};
