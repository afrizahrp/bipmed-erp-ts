import { create } from 'zustand';
interface ProductStoreState {
  productId: string;
  setProductId: (id: string) => void;
  resetProductId: () => void; // Add this line
}

// Define the store using the interface
const useProductStore = create<ProductStoreState>((set) => ({
  productId: '',
  setProductId: (id: string) => set({ productId: id }),
  resetProductId: () => set({ productId: '' }), // Implement the reset action
}));
export default useProductStore;
