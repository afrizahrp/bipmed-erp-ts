'use client';
import * as React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { statuses } from '@/data/data';
import { useProductCategories } from '@/app/queryHook/useProductCategories';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: productCategories, isLoading, error } = useProductCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Map the categories data to the format needed by DataTableFacetedFilter
  const categoryOptions = productCategories?.map((productCategory) => ({
    value: productCategory.categoryName,
    label: productCategory.categoryName,
    // You can add an icon property here if needed
  }));

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col items-start space-y-2'>
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn('categoryName') && (
          <DataTableFacetedFilter
            column={table.getColumn('categoryName')}
            title='Kategori'
            options={categoryOptions || []}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Atur Ulang
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
}
