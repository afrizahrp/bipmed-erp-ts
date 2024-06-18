'use client';
import { DataTable } from './components/data-table';
import { SubCategoryColumns, columns } from './components/columns';

interface SubCategoriesProps {
  data: SubCategoryColumns[];
}

export const SubCategoryListTable: React.FC<SubCategoriesProps> = ({
  data,
}) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
