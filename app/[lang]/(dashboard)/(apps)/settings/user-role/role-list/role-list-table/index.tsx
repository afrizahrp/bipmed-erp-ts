'use client';
import { DataTable } from '@/components/ui/data-table';
import { UserRoleColumns, columns } from './components/columns';

import { routes } from '@/config/routes';

interface UserRoleProps {
  data: UserRoleColumns[];
}

export const UserRoleListTable: React.FC<UserRoleProps> = ({ data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        href={routes.settings.newUserRole}
        hrefText='New Role'
        pageName='userrole'
      />
    </div>
  );
};
