// Import the Combobox component
import React from 'react';
import { SearchColumnBase } from '@/components/searchColumn.base';
import productCategoryOptions from '@/data/productCategoryOptions';
import { Loader2 } from 'lucide-react';

interface SearchColumnProductCategoryProps {
  currentValue?: string;
  onChange: (value: string) => void; // Callback to propagate changes to the parent
disabled:boolean
}
export function SearchColumnProductCategory({
  currentValue,
  onChange,
  disabled
}: SearchColumnProductCategoryProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const {
    options: productCategoryOption,
    isLoading: isProductCategoryLoading,
  } = productCategoryOptions({ filterData: 0 });

  const categoryList = productCategoryOption || [];

  currentValue = selected;

  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {categoryList.length > 0 && !isProductCategoryLoading ? (
        <SearchColumnBase
          options={categoryList}
          selected={selected ?? ''}
          onChange={handleChange}
          placeholder='Select an category'
          disabled={disabled}
        />
      ) : (
        <div>
          {isProductCategoryLoading && (
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
