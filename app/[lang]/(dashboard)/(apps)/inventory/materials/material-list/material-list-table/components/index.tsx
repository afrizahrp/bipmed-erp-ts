import { DataTable } from './data-table';
import { MaterialColumn, columns } from './columns';
import { useTanStackTable } from './use-TanStack-Table';
import TableToolbar from './table-toolbar';

interface MaterialListTableProps {
  data: MaterialColumn[];
}

export const MaterialListTable: React.FC<MaterialListTableProps> = ({
  data,
}) => {
  return (
    <>
      {/* <TableToolbar table={data} /> */}
      <DataTable columns={columns} data={data} />
    </>
  );
};
