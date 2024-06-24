import { InputSearch } from '@/components/ui/inputSearch';
import SearchResults from './searchResult';
import { Loader2 } from 'lucide-react';

interface ShowField {
  key: string;
  label: string;
}

interface Props {
  searchInputValue: string;
  useDataHook: (searchInputValue: string) => { data: any[] };
  showfields: ShowField[];
  tableName?: string;

  /*from searchInput component props*/
  setSearchInputValue: (searchInputValue: string) => void;
  placeholder: string;
  onInputCleared?: () => void;
  disabled: boolean;
  oldValue?: string;
}

export default function SearchExistNameBase({
  useDataHook,
  showfields,
  tableName,
  searchInputValue,
  setSearchInputValue,
  placeholder,
  onInputCleared,
  disabled,
  oldValue,
}: Props) {
  const fShowResult = () => {
    if (oldValue === searchInputValue) {
      return false; // Hide the search result
    } else {
      return true; // Show the search result
    }
  };

  const { isLoading, data } = useDataHook(
    oldValue === searchInputValue ? '' : searchInputValue
  ) as { isLoading: boolean; data: any[] };
  return (
    <>
      <div className='w-full '>
        <InputSearch
          label='name'
          value={searchInputValue}
          currentvalue={oldValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
          placeholder={placeholder}
          disabled={isLoading || disabled}
        />
      </div>

      <div className='flex items-center justify-center w-full py-2'>
        {/* {isLoading && <Loader2 />}{' '} */}
        {/* {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} */}
        {isLoading && (
          <span className=' inline-flex gap-1'>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait, while retrieving data to avoid naming duplication...
          </span>
        )}

        {/* Display Loader2 when isLoading is true */}
        {data && fShowResult() && (
          <div className='w-full'>
            <SearchResults
              data={data}
              showfields={showfields}
              title={
                data.length > 0
                  ? `Terdapat ${data.length} nama  yang terkait dengan penginputan nama ${tableName} "${searchInputValue}".`
                  : `Tidak ada nama yang terkait dengan penginputan nama ${tableName} "${searchInputValue}".`
              }
              description={
                data.length > 0
                  ? `Untuk atribut atau spesifikasi yang sama, hindari penginputan nama ${tableName} yang sama dengan yang sudah ada sebelumnya.`
                  : `Pastikan nama ${tableName} yang diinput sesuai dengan atribut atau spesifikasi atau fungsi dari ${tableName} yang diinginkan.`
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
