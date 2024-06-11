'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

export type MaterialColumn = {
  id: string;
  name: string;
  catalog: string;
  category: string;
  subcategory: string;
  brand: string;
  status: string;
  uom?: string;
  remarks: string;
};

export function getStatusColor(status: string) {
  if (status.toLowerCase() === 'aktif') {
    return 'bg-customGreen';
  } else {
    return 'bg-gray-400';
  }
}

export const columns: ColumnDef<MaterialColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Product Id'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => (
      <Link
        href={`/inventory/products/${row.getValue('id')}`}
        className='text-primary-600 dark:text-primary-400'
      >
        {row.getValue('id')}
      </Link>
    ),
    enableHiding: false,
    // enableSorting: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span
            className={cn('font-sm max-w-[450px] truncate dark:text-slate-300')}
          >
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'uom',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="UOM"
  //       className="text-black dark:text-slate-300"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-1">
  //         <span className="font-sm max-w-[150px] truncate dark:text-slate-300">
  //           {row.getValue('uom')}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  // {
  //   accessorKey: 'category',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Category"
  //       className="text-black dark:text-slate-300"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-1">
  //         <span className="font-sm max-w-[150px] truncate dark:text-slate-300">
  //           {row.getValue('category')}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  // {
  //   accessorKey: 'subcategory',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Subcategory"
  //       className="text-black dark:text-slate-300"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-1">
  //         <span className="font-sm max-w-[150px] truncate dark:text-slate-300">
  //           {row.getValue('subcategory')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'brand',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Brand"
  //       className="text-black dark:text-slate-300"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-1">
  //         <span className="font-sm max-w-[150px] truncate dark:text-slate-300">
  //           {row.getValue('brand')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Status'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      let value: string = row.getValue('status');
      const color = getStatusColor(value);
      return (
        <div className='flex items-center'>
          <span
            className={cn(
              'mr-2 inline-block h-3 w-3 rounded-full dark:text-slate-300',
              color
            )}
          ></span>
          {value}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'remarks',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Remarks'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className='font-sm max-w-[150px] truncate dark:text-slate-300'>
            {row.getValue('remarks')}
          </span>
        </div>
      );
    },
  },
];
