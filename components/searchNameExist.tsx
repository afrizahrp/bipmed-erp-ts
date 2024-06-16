import { Input } from '@/components/ui/input';
import SearchResults from './searchResult';

interface ShowField {
  key: string;
  label: string;
}

interface Props {
  useDataHook: (searchTerms: string) => { data: any[] };
  showfields: ShowField[];
  tableName?: string;
  // searchInput: string;

  /*from searchInput component props*/
  searchInputValue: string;
  setSearchInputValue: (searchInputValue: string) => void;
  placeholder: string;
  onInputCleared: () => void;
  disabled: boolean;
  currentValue?: string;
  onChange?: (newSearchTerms: string) => void;
}

export default function SearchExistName({
  useDataHook,
  showfields,
  tableName,
  // searchInput
  searchInputValue,
  setSearchInputValue,
  placeholder,
  onInputCleared,
  disabled,
  currentValue,
  onChange,
}: Props) {
  const { data } = useDataHook(searchInputValue);

  return (
    <>
      <div className='w-full '>
        <Input
          type='search'
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
          placeholder={placeholder}
          // required
          // className='w-1/2 '
          disabled={disabled}
          style={{ display: 'none' }} // Add this line
        />
      </div>

      <div className='flex w-full py-2'>
        {/* {data && data.length > 0 && ( */}
        {data && (
          <div className='w-full justify-center'>
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
                  ? `Hindari penginputan nama ${tableName} yang sama dengan atribut atau fungsi dari ${tableName} yang sudah ada sebelumnya.`
                  : `Pastikan nama ${tableName} yang diinput sesuai dengan atribut atau fungsi dari ${tableName} yang diinginkan.`
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
