'use client';
import { DataTable } from '@/components/ui/data-table';
import { UserColumns, columns } from './components/columns';

interface UserProps {
  data: UserColumns[];
}

export const UserListTable: React.FC<UserProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href='#'
        hrefText='none'
        pageName='user'
      />
    </div>
  );
};
