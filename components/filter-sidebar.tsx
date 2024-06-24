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
import { DataTableToolbar } from '@/components/ui/data-table-toolbar';
import { CalendarDays, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const users = [
  { value: '202', label: 'Cleopetra' },
  { value: '203', label: 'Nicolas' },
  { value: '204', label: 'John Doe' },
];
const statuses = [
  { value: 'todo', label: 'To do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];
const prioriy = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '14px',
  }),
};

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
  const [openDate, setOPenDate] = useState<boolean>(true);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className='pt-5'>
        <SheetHeader className='flex-row items-center justify-between mb-4'>
          <span className='text-lg font-semibold text-default-900'>
            Create Task
          </span>
        </SheetHeader>
        <form className=' h-full flex flex-col justify-between'>
          <div className='space-y-4'>           
              <div className='space-y-4'>
                <DataTableToolbar table={table} />
            </div>
          </div>
          <SheetFooter className='pb-10'>
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
