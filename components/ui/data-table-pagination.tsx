'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [currentPage, setCurrentPage] = useState(() => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get('page');
    return page
      ? parseInt(page, 10)
      : table.getState().pagination.pageIndex + 1;
  });

  useEffect(() => {
    console.log('Setting current page in local storage:', currentPage);
    localStorage.setItem('currentPage', currentPage.toString());
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    window.history.pushState({}, '', url.toString());
  }, [currentPage]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get('page');
    console.log('URL page:', page);
    if (
      page &&
      parseInt(page, 10) !== table.getState().pagination.pageIndex + 1
    ) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(table.getState().pagination.pageIndex + 1);
    }
  }, [table.getState().pagination.pageIndex]);

  useEffect(() => {
    console.log('Syncing current page with table state:', currentPage);
    if (currentPage !== table.getState().pagination.pageIndex + 1) {
      table.setPageIndex(currentPage - 1);
    }
  }, [currentPage, table]);

  const handlePageChange = (newPageIndex: number) => {
    setCurrentPage(newPageIndex + 1);
    table.setPageIndex(newPageIndex);
  };

  return (
    <div className='flex items-center flex-wrap gap-2 justify-between p-5'>
      <div className='flex-1 text-sm text-muted-foreground whitespace-nowrap'>
        {table.getFilteredSelectedRowModel().rows.length > 0
          ? `${table.getFilteredSelectedRowModel().rows.length} of ${
              table.getFilteredRowModel().rows.length
            } data selected.`
          : `Total ${table.getFilteredRowModel().rows.length}`}{' '}
        data
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-xs'>
          Page {table.getState().pagination.pageIndex + 1}/{' '}
          {table.getPageCount()} Page
        </div>
        <div className='flex flex-wrap items-center gap-6 lg:gap-8'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => handlePageChange(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() =>
                handlePageChange(table.getState().pagination.pageIndex - 1)
              }
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() =>
                handlePageChange(table.getState().pagination.pageIndex + 1)
              }
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => handlePageChange(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
