'use client';

import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';
import { PreviewProduct } from './preview-product';

import { Button } from './ui/button';

const PreviewModalxxx = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

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

          {/* PreviewProduct Component */}
          <div>
            <PreviewProduct data={product} loading={false} />
          </div>

          {/* <div className='pt-6 space-x-2 flex justify-start w-full'>
            <Button variant='outline' onClick={previewModal.onClose}>
              Cancel
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

export default PreviewModalxxx;
