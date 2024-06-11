import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface categories {
  id: string;
  nama: string;
  name: string;
  jenis: any;
  status: any;
  remarks: string;
  categoryType: any;
}
export const useCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<categories[], Error>({
    queryKey: ['categories'],
    queryFn: () =>
      axios.get('/api/inventory/categories').then((res) => res.data),

    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useCategories;
