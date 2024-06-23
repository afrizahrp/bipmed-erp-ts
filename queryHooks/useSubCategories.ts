import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SubCategories } from '@/types';

export const useSubCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<SubCategories[], Error>({
    queryKey: ['subcategories'],
    queryFn: () =>
      axios.get('/api/inventory/subcategories', {}).then((res) => res.data),

    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useSubCategories;
