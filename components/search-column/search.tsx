'use client'
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
// import { useQuery } from '@tanstack/react-query';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { Products, SearchResponse } from '@/types';
// import { searchProductsByName } from '@/api';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import useProducts from '@/queryHook/useProducts';

interface SearchProps {
  searchType: string;
  selectedResult?: Products;
  onSelectResult: (product: Products) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  // const [searchQuery, setSearchQuery] = React.useState('');
  const [searchTerms, setSearchTerms] = useState('');

  const handleSelectResult = (product: Products) => {
    onSelectResult(product);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchTerms}        
        onValueChange={setSearchTerms}
        placeholder="Search for product"
      />

      <SearchResults
        searchTerms={searchTerms}
        searchType='name'
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

interface SearchResultsProps {
  // query: string;
  searchTerms: string;
  searchType: string;
  selectedResult: SearchProps['selectedResult'];
  onSelectResult: SearchProps['onSelectResult'];
}

function SearchResults({
  // query,
  searchTerms,
  searchType,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchTerm] = useDebounce(searchTerms, 1000);

  const enabled = !!debouncedSearchTerm;



  // To get around this https://github.com/TanStack/query/issues/3584
  // const isLoading = enabled && isLoadingOrig;
  const { data, isLoading, isError } = useProducts(
    debouncedSearchTerm,
    searchType
  );


//   console.log('debouncedSearchTerm', debouncedSearchTerm)
// console.log('searchType', searchType)

  console.log('data', data)
  if (!enabled) return null;

  return (
    <CommandList>
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !data?.length && (
        <div className="p-4 text-sm">No products found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {data?.map(({ id, name }) => {
        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, name })}
            value={name}
          >
            <Check
              className={cn(
                'mr-2 h-4 w-4',
                selectedResult?.id === id ? 'opacity-100' : 'opacity-0'
              )}
            />
            {name}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}
