'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CellAction } from './cell-action';
import { EyeOff, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import NextImage from 'next/image';

export type CategoryColumns = {
  type: string | null;
  categoryType: string | null;
  id: string;
  name: string | null;
  iShowedStatus: boolean;
  showStatus: string | null;
  remarks: string | null;
  images: string[];
};

const onChangeStatus = async (id: string, newValue: boolean) => {
  try {
    const response = await axios.patch(`/api/inventory/categories/${id}`, {
      iShowedStatus: newValue,
    });
    return response.data;
    // Call the callback function to update the state if the API call is successful
  } catch (error) {
    console.error(error);
  }
};

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },

  {
    accessorKey: 'showStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Displayed Status'
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

  {
    accessorKey: 'iShowedStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Displayed Status'
        className='text-black dark:text-slate-300'
      />
    ),
    cell: ({ row }) => {
      let value: boolean = row.getValue('iShowedStatus');
      return (
        <Switch
          checked={value}
          onCheckedChange={() => {
            // Assuming `setValue` is a function passed from the parent component to update the state
            const newValue = !value;
            onChangeStatus(row.getValue('id'), newValue);
          }}
        />
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='id' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className={cn('max-w-[80px] truncate font-sm')}>
            {row.getValue('id')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className={cn('max-w-[250px] truncate font-sm')}>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'images',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Images' />
    ),
    cell: ({ row }) => {
      const images = row.getValue('images');
      return (
        <div className='flex space-x-1'>
          {Array.isArray(images) &&
            images.map((image, index) => (
              <NextImage
                key={index}
                src={image}
                width={60}
                height={80}
                alt={`Image ${index}`}
                className='max-w-[80px]'
              />
            ))}
        </div>
      );
    },
  },

  {
    accessorKey: 'remarks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remarks' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-1'>
          <span className={cn('max-w-[350px] truncate font-sm')}>
            {row.getValue('remarks')}
          </span>
        </div>
      );
    },
  },
];
