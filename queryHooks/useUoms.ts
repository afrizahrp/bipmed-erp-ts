import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface uoms {
  id: string;
  name: string;
}
export const useUoms = () => {
  const { data, isLoading, error, ...rest } = useQuery<uoms[], Error>({
    queryKey: ['useUoms'],
    queryFn: () => axios.get('/api/inventory/uoms').then((res) => res.data),

    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useUoms;
