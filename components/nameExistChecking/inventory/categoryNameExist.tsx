'use client';
import { useState, useEffect } from 'react';
import SearchNameExist from '@/components/searchNameExist';
import { useCategoryNameExist } from '@/queryHooks/nameExistChecking/inventory/useCategoryNameExist';

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

  // const { isLoading } = useCategoryNameExist(searchTerms);

  const isLoading = false;
  const handleItemCleared = () => {
    setSearchTerms('');
  };

  const handleSearchTermsChange = (newSearchTerms: string) => {
    setSearchTerms(newSearchTerms);
  };

  return (
    <div className='w-full'>
      <SearchNameExist
        useDataHook={useCategoryNameExist as any}
        showfields={[
          { key: 'id', label: 'Kode' },
          { key: 'name', label: 'Nama' },
        ]}
        disabled={isLoading}
        searchInputValue={searchTerms}
        setSearchInputValue={handleSearchTermsChange}
        placeholder='Input nama kategori di sini'
        onInputCleared={handleItemCleared}
        tableName='kategori'
        oldValue={currentValue}
      />
      {/* )} */}
    </div>
  );
}
