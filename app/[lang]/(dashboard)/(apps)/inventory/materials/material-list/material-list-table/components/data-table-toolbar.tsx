'use client';
import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import useMasterTableStatusOption from '@/data/masterTableStatusOption';
import useMaterialCategoriesOption from '@/data/materialCategoriesOption';
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { options: statusOption, isLoading: isStatusLoading } =
    useMasterTableStatusOption();
  const {
    options: MaterialCategoriesOption,
    isLoading: isMaterialCategoriesLoading,
  } = useMaterialCategoriesOption();

  return (
    <>
      <div className='flex items-center justify-start py-2'>
        <div className='flex flex-col space-y-2 w-full'>
          <div className='w-full py-2'>
            {table.getColumn('status') && (
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title='Status'
                options={statusOption}
                isLoading={isStatusLoading}
              />
            )}
          </div>
          <div className='w-full py-2'>
            {table.getColumn('category') && (
              <DataTableFacetedFilter
                column={table.getColumn('category')}
                title='Category'
                options={MaterialCategoriesOption}
                isLoading={isMaterialCategoriesLoading}
              />
            )}
          </div>
          {isFiltered && (
            <Button
              variant='outline'
              onClick={() => table.resetColumnFilters()}
              className='h-10 px-2 lg:px-3 w-full lg:w-auto'
            >
              Reset Filter
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
