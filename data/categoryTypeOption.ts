import { useCategoryTypes } from '@/queryHooks/useCategoryTypes';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';

type OptionType = { value: string; label: string };

const useCategoryTypeOption = (): OptionType[] | undefined => {
  const { data, isLoading, error } = useCategoryTypes();
  // const { data: statusList, isLoading, error } = useMasterTableStatus();

  const categoryTypeList: OptionType[] | undefined = data?.map(
    (_categoryTypeList) => ({
      value: _categoryTypeList.name,
      label: capitalizeFirstLetter(_categoryTypeList.name),
    })
  );

  return categoryTypeList;
};

export default useCategoryTypeOption;
