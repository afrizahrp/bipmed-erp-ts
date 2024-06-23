'use client';
import { useState, useEffect } from 'react';
import SearchNameExistBase from '@/components/searchNameExist.base';
import { useMaterialNameExist } from '@/queryHooks/nameExistChecking/inventory/useMaterialNameExist';
import { Loader2 } from 'lucide-react';

interface Props {
  currentValue: string;
  onChange: (newSearchTerms: string) => void;
}

export default function MaterialNameExist({ currentValue, onChange }: Props) {
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
      />
      {/* )} */}
    </div>
  );
}
