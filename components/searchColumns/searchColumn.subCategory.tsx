import React from 'react';
import { SearchColumnBase } from '@/components/searchColumn.base';
import subCategoryOptions from '@/data/subCategoryOptions';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface SearchColumnSubCategoryProps {
  currentValue?: string;
  onChange: (value: string) => void; // Callback to propagate changes to the parent
  disabled: boolean;
  category_id: string;
}

export function SearchColumnSubSubCategory({
  currentValue,
  onChange,
  disabled,
  category_id,
}: SearchColumnSubCategoryProps) {
  const [selected, setSelected] = React.useState(currentValue);

  const { options: subCategoryOption, isLoading: isSubCategoryLoading } =
    subCategoryOptions({ filterData: 0, category_id }); // Pass

  const subcategoryList = subCategoryOption || [];

  currentValue = selected;

  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {subcategoryList.length > 0 ? (
        <>
          <Label>Subcategory</Label>
          <SearchColumnBase
            options={subcategoryList}
            selected={selected ?? ''}
            onChange={handleChange}
            placeholder='Select Category'
            disabled={disabled}
          />
          <div>
            {isSubCategoryLoading && (
              <span className='inline-flex gap-1 text-xs'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Loading subcategory list...
              </span>
            )}
          </div>
        </>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
