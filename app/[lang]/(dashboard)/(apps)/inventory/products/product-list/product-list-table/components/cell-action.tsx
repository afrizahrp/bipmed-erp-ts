'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import { MoreVertical } from 'lucide-react';
import { ProductColumn } from './columns';
import { Products } from '@/types';

interface CellActionProps {
  id: string;
}

export const CellAction: React.FC<CellActionProps> = ({
  id,
}: CellActionProps) => {
  const router = useRouter();
  const previewModal = usePreviewModal();

  const onPreview = () => {
    router.push(`/inventory/products/quick-edit/${id}`);

    //   const modifiedData: Products = {
    //     ...data,
    //     images: data.images.map((image) => ({
    //       id: '',
    //       product_id: data.id,
    //       imageURL: image,
    //       isPrimary: false,
    //     })),
    //   };
    //   previewModal.onOpen(modifiedData);
  };

  return (
    <>
      <Button variant='ghost' className='h-8 w-8 p-0' onClick={onPreview}>
        <span className='sr-only'>Open menu</span>
        <MoreVertical className='h-4 w-4' />
      </Button>
    </>
  );
};
