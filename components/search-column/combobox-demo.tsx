'use client';
import { useState,useCallback } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Products } from '@/types';
import { Search } from './search';

const POPOVER_WIDTH = 'w-[250px]';

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Products | undefined>();

  const handleSetActive = useCallback((product: Products) => {
    setSelected(product);

    // OPTIONAL: close the combobox upon selection
    // setOpen(false);
  }, []);

  const displayName = selected ? selected.name : 'Select product';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn('justify-between', POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn('p-0', POPOVER_WIDTH)}>
        <Search searchType = 'name' selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
