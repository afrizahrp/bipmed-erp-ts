// Import the Combobox component
import React from 'react';

import { SearchColumnBase } from '@/components/searchColumn.base';
import materialCategoryOptions from '@/data/materialCategoryOptions';
import { Loader2 } from 'lucide-react';

interface SearchColumCategoryProps {
  currentValue?: string;
  onChange: (value: string) => void; // Callback to propagate changes to the parent
  // value: string | null; // To make it a controlled component
  // Add any other props you need, like disabled, name, etc.
}
export function SearchColumnCategory({
  currentValue,
  onChange,
}: SearchColumCategoryProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const { options: materialCategoryOption, isLoading: isCategoryLoading } =
    materialCategoryOptions();

  const categoryList = materialCategoryOption || [];

  currentValue = selected;
  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {categoryList.length > 0 && !isCategoryLoading ? (
        <SearchColumnBase
          options={categoryList}
          selected={selected ?? ''}
          onChange={handleChange}
          placeholder='Select an category'
        />
      ) : (
        <div>
          {/* {isCategoryLoading && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )} */}

          {isCategoryLoading && (
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
              aria-label='Loading...'
            />
          )}
        </div> // Show a loading state or similar message
      )}
    </div>
  );
}
