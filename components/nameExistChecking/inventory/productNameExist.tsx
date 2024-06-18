'use client';
import { useState } from 'react';
import SearchNameExistBase from '@/components/searchNameExist-base';
import { useProductNameExist } from '@/queryHooks/nameExistChecking/inventory/useProductNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
  onBlur: () => void;
}

export default function ProductNameExist({
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
        tableName='produk'
        oldValue={currentValue}
      />
      {/* )} */}
    </div>
  );
}
