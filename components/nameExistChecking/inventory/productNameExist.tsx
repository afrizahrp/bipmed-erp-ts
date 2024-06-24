'use client';
import { useState, useEffect } from 'react';
import SearchNameExistBase from '@/components/searchNameExist.base';
import { useProductNameExist } from '@/queryHooks/nameExistChecking/inventory/useProductNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
}

export default function ProductNameExist({ currentValue, onChange }: Props) {
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
        useDataHook={useProductNameExist as any}
        showfields={[
          { key: 'id', label: 'Kode' },
          { key: 'catalog_id', label: 'Katalog' },
          { key: 'name', label: 'Nama' },
        ]}
        disabled={isLoading}
        searchInputValue={searchTerms}
        setSearchInputValue={handleSearchTermsChange}
        placeholder='Input product name here'
        onInputCleared={handleItemCleared}
        tableName='product'
      />
      {/* )} */}
    </div>
  );
}
