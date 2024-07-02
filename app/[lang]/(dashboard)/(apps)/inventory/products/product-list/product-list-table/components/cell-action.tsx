'use client';

import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import usePreviewModal from '@/hooks/use-preview-modal';
import { MoreVertical } from 'lucide-react';
import { MouseEventHandler } from 'react';
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
  const router = useRouter();
  const params = useParams();

  // const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   // console.log('previewModal', previewModal);
  //   // event.stopPropagation();
  //   previewModal.onOpen(data);
  // };

  const onPreview = () => {
    // console.log('previewModal', previewModal);
    // event.stopPropagation();
    previewModal.onOpen(data);
  };
  const onConfirm = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${data.id}`);
    //   toast.success('Product deleted.');
    //   router.refresh();
    // } catch (error) {
    //   toast.error('Something went wrong');
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
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
