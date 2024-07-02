'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import usePreviewModal from '@/hooks/use-preview-modal';
import { MoreVertical } from 'lucide-react';
import { ProductColumn } from './columns';
import { Products } from '@/types';

// interface CellActionProps {
//   data: ProductColumn;
// }

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const previewModal = usePreviewModal();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   // console.log('previewModal', previewModal);
  //   // event.stopPropagation();
  //   previewModal.onOpen(data);
  // };

  const onPreview = () => {
    // console.log('previewModal', previewModal);
    // event.stopPropagation();
    const modifiedData: Products = {
      ...data,
      images: data.images.map((image) => ({
        id: '',
        product_id: data.id,
        imageURL: image,
        isPrimary: false,
      })),
    };
    previewModal.onOpen(modifiedData);
  };

  return (
    <>
      {/* <AlertModal
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}

      <Button variant='ghost' className='h-8 w-8 p-0' onClick={onPreview}>
        <span className='sr-only'>Open menu</span>
        <MoreVertical className='h-4 w-4' />
      </Button>
    </>
  );
};
