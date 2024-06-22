'use client';
import { useState, useEffect } from 'react';
import SearchNameExistBase from '@/components/searchNameExist-base';
import { useCategoryNameExist } from '@/queryHooks/nameExistChecking/inventory/useCategoryNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
  // onBlur: () => void;
}

export default function CategoryNameExist({
  currentValue,
  onChange,
  // onBlur,
}: Props) {
  const [searchTerms, setSearchTerms] = useState('');

  // const { isLoading } = useCategoryNameExist(searchTerms);

  useEffect(() => {
    setSearchTerms(currentValue);
  }, [currentValue]);

  const isLoading = false;
  const handleItemCleared = () => {
    setSearchTerms('');
  };

  const handleSearchTermsChange = (newSearchTerms: string) => {
    setSearchTerms(newSearchTerms);
    onChange(newSearchTerms);
    console.log('newSearchTerms', newSearchTerms);
  };

  return (
    <div className='w-full'>
      <SearchNameExistBase
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
        // onChange={handleSearchTermsChange}
        tableName='kategori'
      />
      {/* )} */}
    </div>
  );
}
