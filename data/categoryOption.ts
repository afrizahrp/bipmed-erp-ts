import useCategories from '@/queryHooks/useCategories';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';

type OptionType = { value: string; label: string };

const useCategoryOption = (): OptionType[] | undefined => {
  const { data, isLoading, error } = useCategories();

  const categoryList: OptionType[] | undefined = data?.map((_categoryList) => ({
    value: _categoryList.name,
    label: capitalizeFirstLetter(_categoryList.name),
  }));

  return categoryList;
};

export default useCategoryOption;
