'use client';
import axios from 'axios';

import { useParams, useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';
import { PreviewProduct } from './preview-product';
import { toast } from 'react-hot-toast';
import { Button } from './ui/button';

// interface PreviewModalProps {
//   onConfirm: () => void;
// }

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);
  const router = useRouter();

  if (!product) {
    return null;
  }

  // const onConfirm = async () => {
  //   try {
  //     // setLoading(true);
  //     await axios.patch(`/api/inventory/products/${product.id}`, product);
  //     toast.success('Product has changed successfully.');
  //     previewModal.onClose();

  //     router.refresh();
  //   } catch (error) {
  //     toast.error('Something went wrong');
  //   } finally {
  //     // setLoading(false);
  //     // setOpen(false);
  //   }
  // };

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className='grid grid-cols-[6fr,3fr] gap-8'>
        <div>
          {/* Product Id / Name */}
          <div className='grid w-full items-start'>
            <div>Catalog: {product.catalog_id}</div>
            <div>
              Product: {product.id}-{product.name}
            </div>
          </div>

          <div>
            <PreviewProduct
              data={product}
              // onConfirm={onConfirm}
              loading={false}
            />
          </div>

          {/* <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button
              onClick={previewModal.onClose}
              className='ml-auto'
              variant='outline'
            >
              Cancel
            </Button>

            <Button onClick={onConfirm} className='ml-auto' type='submit'>
              Save
            </Button>
          </div> */}
        </div>

        <div className='w-full'>
          {/* Gallery */}
          {product && product.images && (
            <div>
              <Gallery images={product.images} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
