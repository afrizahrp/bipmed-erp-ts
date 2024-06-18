import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps<T> {
  selectedResult?: T;
  onSelectResult: (item: T) => void;
  useDataHook: (searchTerm: string) => {
    data: T[];
    isLoading: boolean;
    isError: boolean;
  };
  placeholder: string;
}

export function SearchColumnBase<T extends { id: string; name: string }>({
  selectedResult,
  onSelectResult,
  useDataHook,
  placeholder,
}: SearchProps<T>) {
  const [searchTerms, setSearchTerms] = useState('');

  const handleSelectResult = (item: T) => {
    onSelectResult(item);
  };

  return (
    <Command
      shouldFilter={false}
      className='h-auto rounded-lg border border-b-0 shadow-md'
    >
      <CommandInput
        value={searchTerms}
        onValueChange={setSearchTerms}
        placeholder={placeholder}
      />

      <SearchResults
        searchTerms={searchTerms}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
        useDataHook={useDataHook}
      />
    </Command>
  );
}

interface SearchResultsProps<T> {
  searchTerms: string;
  selectedResult?: T;
  onSelectResult: (item: T) => void;
  useDataHook: (searchTerm: string) => {
    data: T[];
    isLoading: boolean;
    isError: boolean;
  };
}

function SearchResults<T extends { id: string; name: string }>({
  searchTerms,
  selectedResult,
  onSelectResult,
  useDataHook,
}: SearchResultsProps<T>) {
  const enabled = !!searchTerms;

  const { data, isLoading, isError } = useDataHook(searchTerms);

  if (!enabled) return null;

  return (
    <CommandList>
      {isLoading && <div className='p-4 text-sm'>Searching...</div>}
      {!isError && !isLoading && !data?.length && (
        <div className='p-4 text-sm'>No items found</div>
      )}
      {isError && <div className='p-4 text-sm'>Something went wrong</div>}

      {data?.map(({ id, name }) => (
        <CommandItem
          key={id}
          onSelect={() => onSelectResult({ id, name } as T)}
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
      ))}
    </CommandList>
  );
}
