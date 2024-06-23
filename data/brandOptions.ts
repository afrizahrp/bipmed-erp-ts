import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useBrands } from '@/queryHooks/useBrands';

type OptionType = { value: string; label: string };

const BrandsOptions = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useBrands();
  const brandList: OptionType[] | undefined = data?.map((_brandList) => ({
    value: _brandList.id,
    label: capitalizeFirstLetter(_brandList.name),
  }));

  return { options: brandList, isLoading };
};

export default BrandsOptions;
