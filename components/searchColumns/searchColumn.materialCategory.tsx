// Import the Combobox component
import React from 'react';

import { SearchColumnBase } from '@/components/searchColumn.base';
import materialCategoryOptions from '@/data/materialCategoryOptions';
import { Loader2 } from 'lucide-react';

interface SearchColumnMaterialCategoryProps {
  currentValue?: string;
  onChange: (value: string) => void; // Callback to propagate changes to the parent
  disabled: boolean;
}
export function SearchColumnMaterialCategory({
  currentValue,
  onChange,
  disabled,
}: SearchColumnMaterialCategoryProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const {
    options: materialCategoryOption,
    isLoading: isMaterialCategoryLoading,
  } = materialCategoryOptions({ filterData: 0 });

  const categoryList = materialCategoryOption || [];

  currentValue = selected;
  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {categoryList.length > 0 && !isMaterialCategoryLoading ? (
        <SearchColumnBase
          options={categoryList}
          selected={selected ?? ''}
          onChange={handleChange}
          placeholder='Select Category'
        />
      ) : (
        <div>
          {isMaterialCategoryLoading && (
            <span className=' inline-flex gap-1'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Retrieving category list...
            </span>
          )}
        </div> // Show a loading state or similar message
      )}
    </div>
  );
}
