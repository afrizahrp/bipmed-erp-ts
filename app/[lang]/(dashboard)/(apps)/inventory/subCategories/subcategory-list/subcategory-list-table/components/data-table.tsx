'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/config/routes';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [filtering, setFiltering] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const params = useParams();
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div>
        <div className='flex flex-col md:flex-row  gap-4'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm '>Show</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side='top'>
                {[5, 10, 20].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex md:w-full sm:w-full lg:w-1/2 relative'>
            <Input
              type='search'
              placeholder='Type here to search...'
              value={filtering}
              onChange={(event) => setFiltering(event.target.value)}
              //  className='flex-grow pl-10 dark:bg-inherit' // Adjust the width based on the screen size
              className='min-w-[300px] sm:max-w-[600px] pl-7 rounded'
            />
            <Icon
              icon='heroicons:magnifying-glass'
              className='w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 left-3 text-default-500'
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size='xs'
                variant='outline'
                // className='ml-auto my-1 px-5 h-8 lg:flex'
              >
                <Filter className='mr-2 h-3 w-3' />
                Filter data
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <div className='text-2xl font-bold text-default-600'>
                    Filter Data
                  </div>{' '}
                </SheetTitle>
                <SheetDescription>
                  To get more specific data you needs
                </SheetDescription>
              </SheetHeader>
              <Separator />

              <div className='grid gap-4 py-3'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <DataTableToolbar table={table} />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type='submit' className='w-full h-10'>
                    Back
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className='flex-none flex flex-col sm:flex-row sm:items-center  gap-4'>
            <DataTableViewOptions table={table} />

            <Button size='sm' asChild>
              <Link href={routes.inventory.newsubCategory}>
                <Plus className='w-3 h-3 mr-2' />
                New SubCategory
              </Link>
            </Button>
          </div>
        </div>

        {/* <div className='space-y-4'>
        <div className='rounded-md border'> */}
        <div className='pt-1'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No data filtered
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination table={table} />
      </div>
    </>
  );
}