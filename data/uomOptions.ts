import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useUoms } from '@/queryHooks/useUoms';

type OptionType = { value: string; label: string };

const useUomsOption = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useUoms();
  const statusList: OptionType[] | undefined = data?.map((_statusList) => ({
    value: _statusList.name,
    label: capitalizeFirstLetter(_statusList.name),
  }));

  return { options: statusList, isLoading };
};

export default useUomsOption;
