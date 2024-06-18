'use client';
import { useState } from 'react';
import SearchNameExistBase from '@/components/searchNameExist-base';
import { useMaterialNameExist } from '@/queryHooks/nameExistChecking/inventory/useMaterialNameExist';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
  onBlur: () => void;
}

export default function MaterialNameExist({
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
        useDataHook={useMaterialNameExist as any}
        showfields={[
          { key: 'id', label: 'Kode' },
          { key: 'name', label: 'Nama' },
        ]}
        disabled={isLoading}
        searchInputValue={searchTerms}
        setSearchInputValue={handleSearchTermsChange}
        placeholder='Input material name here'
        onInputCleared={handleItemCleared}
        tableName='material'
        oldValue={currentValue}
      />
      {/* )} */}
    </div>
  );
}
