// Import the Combobox component
import React from 'react';

import { SearchColumnBase } from '@/components/searchColumn.base';
import useUomsOptions from '@/data/uomOptions';

interface SearchColumnUom {
  onChange: (value: string) => void; // Callback to propagate changes to the parent
  // value: string | null; // To make it a controlled component
  // Add any other props you need, like disabled, name, etc.
}
export function SearchColumnUom({ onChange }: SearchColumnUom) {
  const [selected, setSelected] = React.useState('');

  const { options: uomOption, isLoading: isStatusLoading } = useUomsOptions();

  const uomList = uomOption || [];

  // Function to handle selection changes
  const handleChange = (newValue: any) => {
    setSelected(newValue);
    onChange(newValue); // Propagate changes to the parent component
  };

  return (
    <div>
      {uomList.length > 0 && !isStatusLoading ? (
        <SearchColumnBase
          options={uomList}
          selected={selected}
          onChange={handleChange}
          placeholder='Select an uom'
        />
      ) : (
        <div>Loading...</div> // Show a loading state or similar message
      )}
    </div>
  );
}
