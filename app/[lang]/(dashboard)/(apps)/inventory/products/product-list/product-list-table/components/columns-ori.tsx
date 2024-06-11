'use client';
import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

export type ProductColumn = {
  id: string;
  name: string;
  catalog_id: string;
  categoryName: string;
  subCategoryName: string;
  uom_id: string;
  createdAt: string;
  iStatus: number;
  status: string;
};

export function getStatusColor(status: string) {
  if (status === 'Aktif') {
    return 'bg-green-600';
  } else {
    return 'bg-gray-400';
  }
}

export const columnsOri: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'id',
    header: 'Kode',
    cell: ({ row }) => (
      <Link className='text-customBlue' href={`/product/${row.getValue('id')}`}>
        {row.getValue('id')}
      </Link>
    ),
  },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'catalog_id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Katalog
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('catalog_id')}</div>,
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kategori
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('categoryName')}</div>,
  },
  {
    accessorKey: 'subCategoryName',
    header: 'Subkategori',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      let value: string = row.getValue('status');
      value = value.trim();
      const color = getStatusColor(value);
      return (
        <div className='flex items-center'>
          <span
            className={cn('inline-block h-3 w-3 rounded-full mr-2', color)}
          ></span>
          {value}
        </div>
      );
    },
  },
];
