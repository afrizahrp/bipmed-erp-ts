'use client';
import { useState } from 'react';
import SearchNameExistBase from '@/components/searchNameExist-base';
import { useSubCategoryNameExist } from '@/queryHooks/nameExistChecking/inventory/useSubCategoryNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
  onBlur: () => void;
}

export default function CategoryNameExist({
  currentValue,
  onChange,
  onBlur,
}: Props) {
  const [searchTerms, setSearchTerms] = useState(currentValue);

  const isLoading = false;
  const handleItemCleared = () => {
    setSearchTerms('');
  };

  const handleSearchTermsChange = (newSearchTerms: string) => {
    setSearchTerms(newSearchTerms);
  };

  return (
    <div className='w-full'>
      <SearchNameExistBase
        useDataHook={useSubCategoryNameExist as any}
        showfields={[
          { key: 'id', label: 'Kode' },
          { key: 'name', label: 'Nama' },
        ]}
        disabled={isLoading}
        searchInputValue={searchTerms}
        setSearchInputValue={handleSearchTermsChange}
        placeholder='Input subCategory name here'
        onInputCleared={handleItemCleared}
        tableName='subkategori'
        oldValue={currentValue}
      />
      {/* )} */}
    </div>
  );
}
