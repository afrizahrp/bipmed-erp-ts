import { create } from 'zustand';
import { Categories } from '@/types';

interface CategoryDialogStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data: any) => void;
  onClose: () => void;
}

const useCategoryDialog = create<CategoryDialogStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Categories) => {
    // console.log('data from usePreview', data); // Log the data when onOpen is called
    set({ isOpen: true, data });
  },
  onClose: () => set({ isOpen: false }),
}));

export default useCategoryDialog;
