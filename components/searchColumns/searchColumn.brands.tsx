// Import the Combobox component
import React from 'react';

import { SearchColumnBase } from '@/components/searchColumn.base';
import BrandsOptions from '@/data/brandOptions';
import { Loader2 } from 'lucide-react';

interface SearchColumCategoryProps {
  currentValue?: string;
  onChange: (value: string) => void; // Callback to propagate changes to the parent
  disabled: boolean;
}
export function SearchColumnBrand({
  currentValue,
  onChange,
  disabled,
}: SearchColumCategoryProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const { options: brandOption, isLoading: isBrandOption } = BrandsOptions({
    filterData: 0,
  });

  const brandList = brandOption || [];

  currentValue = selected;
  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {brandList.length > 0 && !isBrandOption ? (
        <SearchColumnBase
          options={brandList}
          selected={selected ?? ''}
          onChange={handleChange}
          placeholder='Select Brand'
        />
      ) : (
        <div>
          {/* {isBrandOption && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} */}

          {isBrandOption && (
            <span className=' inline-flex gap-1'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Retrieving brand list...
            </span>
          )}
        </div> // Show a loading state or similar message
      )}
    </div>
  );
}
