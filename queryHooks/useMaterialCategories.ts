import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface materialCategories {
  categoryName: string;
}
export const useMaterialCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<
    materialCategories[],
    Error
  >({
    queryKey: ['materialCategories'],
    queryFn: () =>
      axios
        .get('/api/inventory/materialCategories', {})
        .then((res) => res.data),

    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useMaterialCategories;
