'use client';
// import { Input } from '@nextui-org/react';
import { Input } from '@/components/ui/input';

interface Props {
  name:string
  searchInputValue: string;
  setSearchInputValue: (searchInputValue: string) => void;
  placeholder: string;
  // onInputCleared: () => void;
  disabled: boolean;
}

export default function SearchInput({
  name,
  searchInputValue,
  setSearchInputValue,
  placeholder,
  disabled,
}: Props) {
  return (
    <div className='w-full flex items-center justify-center'>
      <Input
        type='search'
        disabled={disabled}
        name={name}
        value={searchInputValue}
        onChange={(e) => {
          setSearchInputValue(e.target.value);
        }}
        placeholder={placeholder}
        required
        className='w-full flex font-bold'
      />
    </div>
  );
}
