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
  // console.log({ currentValue, onChange, onBlur });

  const [searchTerms, setSearchTerms] = useState('');
  const [oldValue, setOldValue] = useState(currentValue);

  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (oldValue !== currentValue) {
      setSearchTerms(currentValue);
      setOldValue(currentValue);
    }
  }, [currentValue, oldValue]);

  const { data, isLoading, error } = useCategoryNameExist(searchTerms);
  const handleItemCleared = () => {
    setSearchTerms('');
  };

  const handleSearchTermsChange = (newSearchTerms: string) => {
    setSearchTerms(newSearchTerms);
    onChange(newSearchTerms);
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
        // setSearchInputValue={setSearchTerms}
        setSearchInputValue={handleSearchTermsChange}
        placeholder='Input nama kategori di sini'
        onInputCleared={handleItemCleared}
        tableName='kategori'
        currentValue={categoryName}
        onChange={(newCategoryName) => {
          // console.log('Category name changed:', newCategoryName);
          setCategoryName(newCategoryName);
        }}
      />
    </div>
  );
}
