import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useMaterialCategories } from '@/queryHooks/useMaterialCategories';

type OptionType = { value: string; label: string };

const materialCategoryOptions = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useMaterialCategories();
  const materialCategoryList: OptionType[] | undefined = data?.map(
    (_materialCategoryList) => ({
      value: _materialCategoryList.id,
      label: capitalizeFirstLetter(_materialCategoryList.name),
    })
  );

  return { options: materialCategoryList, isLoading };
};

export default materialCategoryOptions;
