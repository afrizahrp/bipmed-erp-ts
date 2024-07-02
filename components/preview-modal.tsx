'use client';

import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import { ProductImages } from '@/types';
import Modal from '@/components/ui/modal';
import { PreviewProduct } from '@/app/[lang]/(dashboard)/(apps)/inventory/products/product-list/product-list-table/components/preview-product';
import Image from 'next/image';

import ImageCollection from './ui/images-collection';

const PreviewModal = () => {
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
            <PreviewProduct
              data={product}
              onConfirm={previewModal.onClose}
              loading={false}
            />
          </div>
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
