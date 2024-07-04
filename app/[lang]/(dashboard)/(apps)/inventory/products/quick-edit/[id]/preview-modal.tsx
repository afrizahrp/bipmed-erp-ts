'use client';

import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';
import ProductFormQuickEdit from './product-form-quick-edit';

// interface QuickEditProductProps {
//   data: any;
// }

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  // const product = usePreviewModal(data); //usePreviewModal((state) => state.data);

  console.log('previewModal', product);

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
            <ProductFormQuickEdit data={product} loading={false} />
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

export default PreviewModal;
