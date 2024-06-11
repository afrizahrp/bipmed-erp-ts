import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useMaterialCategories } from '@/queryHooks/useMaterialCategories';

type OptionType = { value: string; label: string };

export const useMaterialCategoriesOption = async () => {
  const { data } = useMaterialCategories(); // Add destructuring to extract the 'data' property
  const categoryList: OptionType[] | undefined = data?.map(
    (_categoryList: any) => ({
      // Add explicit type declaration for '_categoryList'
      value: _categoryList.name,
      label: _categoryList.name,
    })
  );

  console.log(categoryList);
  return categoryList;
};

export default useMaterialCategoriesOption;

// import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
// import { useMasterTableStatus } from '@/queryHooks/useMasterTableStatus';

// type OptionType = { value: string; label: string };

// const useMasterTableStatusOption = (): OptionType[] | undefined => {
//   const { data } = useMasterTableStatus();
//   const statusList: OptionType[] | undefined = data?.map((_statusList) => ({
//     value: _statusList.name,
//     label: capitalizeFirstLetter(_statusList.name),
//   }));

//   return statusList;
// };
