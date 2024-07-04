"use client";

import * as React from "react";
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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Filter, SearchIcon } from "lucide-react";

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import { DataTableViewOptions } from "./data-table-view-options";

import { Button } from "./button";
import { Modal } from "@/components/ui/modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableOriginal<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [filtering, setFiltering] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
      {/* <div className='flex items-center relative w-1/2 md:w-1/2 lg:w-1/2 pb-2 py-2'> */}
      <div className="flex w-3/4 md:w-1/2 lg:w-3/4 relative">
        <Input
          type="search"
          placeholder="Ketik dan tekan enter di sini untuk mencari"
          value={filtering}
          onChange={(event) => setFiltering(event.target.value)}
          className="flex-grow pl-10 dark:bg-inherit" // Adjust the width based on the screen size
        />
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />{" "}
        <Button
          size="lg"
          variant="outline"
          className="ml-auto mx-3 my-1 px-5 hidden h-8 lg:flex"
          onClick={() => setIsModalOpen(true)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter data
        </Button>
        <DataTableViewOptions table={table} />
      </div>

      <Modal
        title="Filter data"
        description="Filter disini untuk pencarian data yang lebih spesifik."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <DataTableToolbar table={table} />
      </Modal>

      <div className="space-y-4">
        {/* <DataTableToolbar table={table} /> */}
        <div className="rounded-md border">
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
                    data-state={row.getIsSelected() && "selected"}
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
                    className="h-24 text-center"
                  >
                    Tidak ada data.
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
