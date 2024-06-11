'use client';
import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import useCategoryTypeOption from '@/data/categoryTypeOption';
import useMasterTableStatusOption from '@/data/masterTableStatusOption';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const statusOption = useMasterTableStatusOption();
  const categoryTypeOption = useCategoryTypeOption();
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col items-start space-y-2 w-full'>
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statusOption}
          />
        )}
        {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title='Category Type'
            options={categoryTypeOption}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3 w-full lg:w-auto'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
}
