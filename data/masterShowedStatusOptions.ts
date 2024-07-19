import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useMasterShowedStatus } from '@/queryHooks/useMasterShowedStatus';

type OptionType = { value: string; label: string };

const masterTableStatusOptions = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useMasterShowedStatus();
  const statusList: OptionType[] | undefined = data?.map((_statusList) => ({
    value: _statusList.name,
    label: capitalizeFirstLetter(_statusList.name),
  }));

  return { options: statusList, isLoading };
};

export default masterTableStatusOptions;
