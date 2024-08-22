'use client';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import Link from 'next/link';

export type UserColumns = {
  id: string;
  name: string | null;
  roleId: string | null;
};

export function getStatusColor(status: string) {
  if (status.toLowerCase() === 'active') {
    return 'bg-green-600';
  } else {
    return 'bg-gray-400';
  }
}
export const columns: ColumnDef<UserColumns>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <Link
        href={`/inventory/subcategories/${row.getValue('id')}`}
        className='text-primary-600 dark:text-primary-400'
      >
        {row.getValue('id')}
      </Link>
    ),
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className={cn('max-w-[450px] truncate font-sm')}>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'roleId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className={cn('max-w-[350px] truncate font-sm')}>
            {row.getValue('roleId')}
          </span>
        </div>
      );
    },
  },
];
