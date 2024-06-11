import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface categoryTypes {
  id: string;
  name: string;
  icon: string;
}
export const useCategoryTypes = () => {
  const { data, isLoading, error, ...rest } = useQuery<categoryTypes[], Error>({
    queryKey: ['categoryTypes'],
    queryFn: () =>
      axios.get('/api/inventory/categoryTypes').then((res) => res.data),

    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useCategoryTypes;
