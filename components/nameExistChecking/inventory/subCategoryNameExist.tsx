'use client';
import { useState, useEffect } from 'react';
import SearchNameExistBase from '@/components/searchNameExist.base';
import { useSubCategoryNameExist } from '@/queryHooks/nameExistChecking/inventory/useSubCategoryNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
}

export default function CategoryNameExist({ currentValue, onChange }: Props) {
  const [searchTerms, setSearchTerms] = useState('');

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
        tableName='subcategory'
      />
      {/* )} */}
    </div>
  );
}
