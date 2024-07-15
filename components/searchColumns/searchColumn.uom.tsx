// Import the Combobox component
import React from 'react';

import { SearchColumnBase } from '@/components/searchColumn.base';
import uomOptions from '@/data/uomOptions';
import { Loader2 } from 'lucide-react';

interface SearchColumnUomProps {
  currentValue?: string;
  onChange: (value: string) => void;
  disabled: boolean;
}
export function SearchColumnUom({
  currentValue,
  onChange,
  disabled,
}: SearchColumnUomProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const { options: uomOption, isLoading: isUomLoading } = uomOptions({
    filterData: 0,
  });

  const uomList = uomOption || [];

  currentValue = selected;
  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {uomList.length > 0 && !isUomLoading ? (
        <SearchColumnBase
          options={uomList}
          selected={selected ?? ''}
          onChange={handleChange}
          placeholder='Select Uom'
          disabled={disabled}
        />
      ) : (
        <div>
          {isUomLoading && (
            <span className=' inline-flex gap-1 text-xs'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Loading uom list...
            </span>
          )}
        </div> // Show a loading state or similar message
      )}
    </div>
  );
}
