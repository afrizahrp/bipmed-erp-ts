'use client';
import * as React from 'react';
import axios from 'axios';

// import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

export type ProductColumn = {
  id: string;
  name: string | null;
  catalog: string | null;
  category: string | null;
  subcategory: string | null;
  brand: string | null;
  iStatus: boolean;
  status: string | null;
  uom: string | null;
  remarks: string | null;
};

export function changeStatusCaption(iStatus: boolean) {
  return iStatus ? 'non Active' : 'active';
}

export function getStatusColor(status: string) {
  if (status.toLowerCase() === 'active') {
    return 'bg-green-600';
  } else {
    return 'bg-gray-400';
  }
}

// console.log('ProductColumn', ProductColumn);

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: 'iStatus',
    accessorKey: 'iStatus',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => {
      const [isChecked, setIsChecked] = React.useState(row.original.iStatus);
      const [name, setName] = React.useState(row.original.name);

      const handleCheckboxChange = async (checked: boolean) => {
        setIsChecked(checked);
        console.log(row.original.id);

        try {
          const response = await axios.patch(
            `/api/inventory/products/${row.original.id}`,
            {
              id: row.original.id,
              iStatus: checked,
              name: name,
            }
          );
          // Handle response if needed, e.g., updating local state to reflect the change
          console.log('Update successful', response.data);
        } catch (error) {
          // Handle error, e.g., displaying an error message to the user
          console.error('Error updating iStatus', error);
        }
      };

      return (
        <div>
          <Checkbox
            color='secondary'
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            aria-label='Select row'
          />
          {/* {changeStatusCaption(isChecked)} */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

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
        <div className='w-[140px]'>
          <span
            className={cn(
              'inline-block h-3 w-3 rounded-full mr-2 dark:text-slate-300',
              color
            )}
          ></span>
          {value}
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
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
        className='text-primary-600 dark:text-slate-200'
      >
        {row.getValue('id')}
      </Link>
    ),
    enableHiding: false,
    // enableSorting: false,
  },
  {
    accessorKey: 'catalog',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Catalog'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => (
      <div className='w-[150px] dark:text-slate-300'>
        {row.getValue('catalog')}
      </div>
    ),
    enableHiding: false,
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
            className={cn('max-w-[450px] dark:text-slate-300 truncate font-sm')}
          >
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'uom',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='UOM'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
            {row.getValue('uom')}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Category'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
            {row.getValue('category')}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'subcategory',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Subcategory'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
            {row.getValue('subcategory')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Brand'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
            {row.getValue('brand')}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title='Status'
  //       className='text-black dark:text-slate-300'
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     let value: string = row.getValue('status');
  //     const color = getStatusColor(value);
  //     return (
  //       <div className='w-[140px]'>
  //         <span
  //           className={cn(
  //             'inline-block h-3 w-3 rounded-full mr-2 dark:text-slate-300',
  //             color
  //           )}
  //         ></span>
  //         {value}
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

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
          <span className='max-w-[150px] truncate dark:text-slate-300 font-sm'>
            {row.getValue('remarks')}
          </span>
        </div>
      );
    },
  },
];
