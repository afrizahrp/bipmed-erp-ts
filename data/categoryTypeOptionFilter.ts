import { useCategoryTypes } from '@/queryHooks/useCategoryTypes';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';

type OptionType = { value: string; label: string };

const useCategoryTypeOptionFilter = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading, error } = useCategoryTypes();

  const categoryTypeList: OptionType[] | undefined = data?.map(
    (_categoryTypeList) => ({
      value: _categoryTypeList.name,
      label: capitalizeFirstLetter(_categoryTypeList.name),
    })
  );
  return { options: categoryTypeList, isLoading };
};

export default useCategoryTypeOptionFilter;
