import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';

interface products {
  id: string;
  catalog_id: string;
  name: string;
  category_id: string;
  subCategory_id: string;
  brand_id: string;
  uom_id: string;
  images: string;
  iStatus: boolean;
  remarks: string;
  isMaterial: boolean;
  iShowedStatus: boolean;
  category: string;
  subCateogry: string;
  brand: string;
  uom: string;
}
export const useProducts = () => {
  const { data, isLoading, error, ...rest } = useQuery<products[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('/api/inventory/products', {});
      return res.data;
    },
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useProducts;
