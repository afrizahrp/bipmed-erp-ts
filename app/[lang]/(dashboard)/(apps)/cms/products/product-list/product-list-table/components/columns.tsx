'use client';
import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CellAction } from './cell-action';
import { EyeOff, Eye } from 'lucide-react';
import NextImage from 'next/image';

export type ProductColumn = {
  id: string;
  name: string | null;
  catalog: string | null;
  catalog_id: string;
  category: string | null;
  category_id: string;
  brand: string | null;
  uom: string | null;
  remarks: string | null;
  images: string[];
  imgPrimary: string[];
};

export function getStatusColor(status: string) {
  if (status.toLowerCase() === 'active') {
    return 'bg-green-600';
  } else {
    return 'bg-gray-400';
  }
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
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
      <div className='w-[100px] dark:text-slate-300'>
        {row.getValue('catalog')}
      </div>
    ),
    enableHiding: false,
  },

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
      <Link
        href={routes.cms.editProductCms(row.getValue('id'))}
        className='text-primary-600 dark:text-slate-200'
      >
        {row.getValue('id')}
      </Link>
    ),
    enableHiding: false,
    enableSorting: true,
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
    accessorKey: 'imgPrimary',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Primary Image' />
    ),
    cell: ({ row }) => {
      const imgPrimary = row.getValue('imgPrimary');

      return (
        <div className='flex space-x-1'>
          {Array.isArray(imgPrimary) && imgPrimary.length > 0 ? (
            imgPrimary.map((image, index) => (
              <NextImage
                key={index}
                src={image}
                width={60}
                height={80}
                alt={`Image ${index}`}
                className='max-w-[80px]'
              />
            ))
          ) : (
            <p>No available image</p>
          )}
        </div>
      );
    },
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
            <Eye className='mr-2 text-green-500' />
          ) : (
            <EyeOff className='mr-2 text-gray-500' />
          )}
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },

  // {
  //   accessorKey: 'uom',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title='UOM'
  //       className='text-black dark:text-slate-300'
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-1'>
  //         <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
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
  //   accessorKey: 'images',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='All Images' />
  //   ),
  //   cell: ({ row }) => {
  //     const images = row.getValue('images');
  //     const imgPrimary = row.getValue('img');

  //     // const primaryImage = images.find((image) => image.isPrimary);
  //     console.log('imgPrimary:', imgPrimary);
  //     return (
  //       <div className='flex space-x-1'>
  //         {Array.isArray(images) &&
  //           images.map((image, index) => (
  //             <NextImage
  //               key={index}
  //               src={image}
  //               width={60}
  //               height={80}
  //               alt={`Image ${index}`}
  //               className='max-w-[80px]'
  //             />
  //           ))}
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: 'remarks',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title='Remarks'
  //       className='text-black dark:text-slate-300'
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-1'>
  //         <span className='max-w-[150px] truncate dark:text-slate-300 font-sm'>
  //           {row.getValue('remarks')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: 'subcategory',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title='Subcategory'
  //       className='text-black dark:text-slate-300'
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-1'>
  //         <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
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
  //       title='Brand'
  //       className='text-black dark:text-slate-300'
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-1'>
  //         <span className='max-w-[150px] dark:text-slate-300 truncate font-sm'>
  //           {row.getValue('brand')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
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
];
