'use client';

import { Button } from '@/components/ui/button';
import useCategoryDialog from '@/hooks/use-category-dialog';
import { Pencil } from 'lucide-react';
import { CategoryColumns } from './columns';
import { Categories } from '@/types';
interface CellActionProps {
  data: CategoryColumns;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const categoryDialog = useCategoryDialog();

  const onPreview = () => {
    const modifiedData: Categories = {
      ...data,
      type: data.type || '',
      iStatus: Boolean(data.iStatus) || false,
      remarks: data.remarks || '',
      showStatus: false, // Add the showStatus property here

      images: data.images.map((image) => ({
        id: '',
        category_id: data.id,
        imageURL: image,
        isPrimary: false,
      })),
    };

    categoryDialog.onOpen(modifiedData, false);
  };

  return (
    <>
      <Button variant='ghost' className='h-8 w-8 p-0' onClick={onPreview}>
        <span className='sr-only'>Open menu</span>
        <Pencil className='h-4 w-4' />
      </Button>
    </>
  );
};
