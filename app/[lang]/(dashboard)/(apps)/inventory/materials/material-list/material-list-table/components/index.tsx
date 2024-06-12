// 'use client'
import { DataTable } from './data-table';
import { MaterialColumn, columns } from './columns';
interface MaterialClientProps {
  data: MaterialColumn[];
}

export const MaterialListTable: React.FC<MaterialClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
