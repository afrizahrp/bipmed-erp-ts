import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

interface ProductCategories {
  id: string;
  name: string;
}
export const useProductCategories = (searchTerms: string) => {
  const [debouncedSearchTerms] = useDebounce(searchTerms, 500); // Debounce searchTerms with a 500ms delay
  const { data, isLoading, isError, ...rest } = useQuery<
    ProductCategories[],
    Error
  >({
    queryKey: ['productCategories', debouncedSearchTerms],
    queryFn: () =>
      debouncedSearchTerms
        ? axios
            .get('/api/inventory/productCategories', {
              params: {
                name: debouncedSearchTerms, // use searchType as the parameter name
              },
            })
            .then((res) => res.data)
        : Promise.resolve([]), // Resolve to an empty array if name is not provided

    staleTime: 60 * 1000, //60s
    retry: 3,
    enabled: !!debouncedSearchTerms, // Only run the query if both searchTerms and searchType are provided
  });

  return { data, isLoading, isError, ...rest };
};

export default useProductCategories;
