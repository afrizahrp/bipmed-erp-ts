import { capitalizeFirstLetter } from "@/utils/capitalize-first-letter";
import { useProductCategories } from "@/queryHooks/useProductCategories";

type OptionType = { value: string; label: string };

const useProductCategoriesOption = (): {
  options: OptionType[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useProductCategories();
  const productCategoryList: OptionType[] | undefined = data?.map(
    (_productCategoryList) => ({
      value: _productCategoryList.name,
      label: capitalizeFirstLetter(_productCategoryList.name),
    })
  );

  return { options: productCategoryList, isLoading };
};

export default useProductCategoriesOption;
