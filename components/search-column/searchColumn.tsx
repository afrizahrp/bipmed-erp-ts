'use client';
import { useState, useCallback } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Categories } from '@/types';
import { SearchColumnBase } from './searchColumn-base';

const POPOVER_WIDTH = 'w-[250px]';

interface Props {
  field: string;
}

export function SearchColumn({ field }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Categories | undefined>();

  const handleSetActive = useCallback((category: Categories) => {
    setSelected(category);

    // OPTIONAL: close the combobox upon selection
    // setOpen(false);
  }, []);

  const displayName = selected ? selected.name.toString() : field;
  // const displayName = selected ? selected.name : 'Select Category';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn('justify-between', POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent side='bottom' className={cn('p-0', POPOVER_WIDTH)}>
        <SearchColumnBase
          selectedResult={selected}
          onSelectResult={handleSetActive}
        />
      </PopoverContent>
    </Popover>
  );
}
