import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useCategories } from '../queryHooks/useCategories';

type categoryOptionProps = {
  filterData: number; //0 - search, 1 - filter
};

type OptionType = { value: string; label: string };

const categoryOptions = ({
  filterData,
}: categoryOptionProps): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useCategories();
  const categoryList: OptionType[] | undefined = data?.map((_categoryList) => ({
    value: filterData === 0 ? _categoryList.id : _categoryList.name ?? '',
    label: capitalizeFirstLetter(_categoryList.name),
  }));

  return { options: categoryList, isLoading };
};

export default categoryOptions;
