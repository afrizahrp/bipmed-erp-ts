'use client';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { EyeOff, Eye } from 'lucide-react';

export type PriceListColumn = {
  id: string;
  name: string;
  iStatus: boolean;
  status: string;
  iShowedStatus: boolean;
  showStatus: string;
};

export function getStatusColor(status: string) {
  if (status.toLowerCase() === 'active') {
    return 'bg-green-600';
  } else {
    return 'bg-gray-400';
  }
}

export const columns: ColumnDef<PriceListColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Id'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-1'>{row.getValue('id')}</div>
    ),
    enableHiding: false,
    enableSorting: true,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Filename'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-1'>{row.getValue('name')}</div>
    ),
    enableHiding: false,
    enableSorting: true,
  },

  {
    accessorKey: 'showStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Display Status'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      let value: string = row.getValue('showStatus');
      const isDisplayed = value === 'Shown';
      return (
        <div className='w-[40px]'>
          {isDisplayed ? (
            <Eye className='mr-2 text-green-500 items-center justify-center' />
          ) : (
            <EyeOff className='mr-2 text-gray-500 items-center justify-center' />
          )}
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
];
