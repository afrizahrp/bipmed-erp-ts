'use client';
import { DataTable } from './components/data-table';
import { CategoryColumns, columns } from './components/columns';

interface CategoriesProps {
  data: CategoryColumns[];
}

export const CategoryListTable: React.FC<CategoriesProps> = ({ data }) => {


  return (
   <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
