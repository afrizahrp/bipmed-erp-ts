import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useUoms } from '@/queryHooks/useUoms';

type OptionType = { value: string; label: string };

const uomOptions = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useUoms();
  const uomList: OptionType[] | undefined = data?.map((_uomList) => ({
    value: _uomList.id,
    label: capitalizeFirstLetter(_uomList.name),
  }));

  return { options: uomList, isLoading };
};

export default uomOptions;
