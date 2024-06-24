'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { Table } from '@tanstack/react-table';
import { DataTableToolbar } from './data-table-toolbar';
import { Separator } from '@/components/ui/separator';

interface FilterSidebarProps<TData> {
  table: Table<TData>;
  open: boolean;
  onClose: () => void;
}

export function FilterSidebar<TData>({
  table,
  open,
  onClose,
}: FilterSidebarProps<TData>) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className='pt-5'>
        <SheetHeader className='flex-row items-center justify-between mb-4'>
          <span className='text-lg font-semibold text-default-900'>
            Filter Data
          </span>
        </SheetHeader>
        <span className='text-sm text-default-400 mt-1'>
          To get specific data you needs
        </span>
        <Separator />
        <form className=' h-full flex flex-col justify-between'>
          <div className='space-y-4 w-full'>
            <DataTableToolbar table={table} />
          </div>
          <SheetFooter className='pb-12'>
            <SheetClose asChild>
              <Button
                className='w-full'
                type='button'
                color='primary'
                variant='outline'
              >
                Back
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSidebar;
