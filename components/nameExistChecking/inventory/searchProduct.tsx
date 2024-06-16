'use client';
import { useState } from 'react';
import { useProducts } from '@/queryHook/useProducts';
import { useDebounce } from 'use-debounce';
import SearchExistName from '@/components/search-exist-name';
import SearchInput from '@/components/searchInput';

interface Props {
  searchType: string;
  placeholder?: string;
}

// export default function SearchProduct({}) {
export default function SearchProduct({ searchType, placeholder }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<number | null>(null);
  const [searchTerms, setSearchTerms] = useState('');

  const [debouncedSearchTerm] = useDebounce(searchTerms, 1000);

  const { data, isLoading, error } = useProducts(
    debouncedSearchTerm,
    searchType
  );
  // const handleItemSelected = (item: any) => {
  //   setSelectedId(item.id);
  //   setSelectedName(item.name);
  //   setSelectedStock(item.stock);
  // };

  const handleItemCleared = () => {
    setSelectedId('');
    setSelectedName('');
    setSearchTerms('');
  };

  // console.log('debouncedSearchTerm', debouncedSearchTerm);

  return (
    <div className='w-full'>
      <SearchInput
        disabled={isLoading}
        searchInputValue={searchTerms}
        setSearchInputValue={setSearchTerms}
        placeholder={placeholder || ''}
        onInputCleared={handleItemCleared}
        searchType={searchType}
      />

      <SearchExistName
        useDataHook={useProducts as any}
        showfields={[
          { key: 'id', label: 'Kode' },
          { key: 'catalog_Id', label: 'Katalog' },
          { key: 'name', label: 'Nama' },
        ]}
        searchInput={debouncedSearchTerm}
        // onItemSelected={handleItemSelected}
        tableName={'produk'}
      />
    </div>
  );
}
