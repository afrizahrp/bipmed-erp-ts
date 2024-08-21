// components/role-list-table/index.js
'use client';

import { Fragment, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { UserRoleColumns } from './components/columns';

type UserRoleListTableProps = {
  data: UserRoleColumns[];
};

export const UserRoleListTable = ({ data }: UserRoleListTableProps) => {
  const [collapsedRows, setCollapsedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    if (collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter((rowId) => rowId !== id));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead>Members</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((role) => (
          <Fragment key={role.id}>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-4'>
                  <Button
                    onClick={() => toggleRow(role.id)}
                    size='icon'
                    variant='outline'
                    className='h-7 w-7 border-none rounded-full'
                  >
                    <Icon
                      icon='heroicons:chevron-down'
                      className={cn('h-5 w-5 transition-all duration-300', {
                        'rotate-180': collapsedRows.includes(role.id),
                      })}
                    />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.status}</TableCell>
              <TableCell>{role.remarks}</TableCell>
              <TableCell>
                {role.users?.map((user) => user.name).join(', ')}
              </TableCell>{' '}
            </TableRow>
            {collapsedRows.includes(role.id) && (
              <TableRow>
                <TableCell colSpan={4} className='text-left'>
                  <div className='flex flex-col items-start'>
                    <p>
                      Details of <b>{role.id}</b> role
                    </p>
                    <p>Number of users: {role.users?.length}</p>
                    {role.users?.map((user) => (
                      <div key={user?.id} className='pl-4'>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                      </div>
                    ))}{' '}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
