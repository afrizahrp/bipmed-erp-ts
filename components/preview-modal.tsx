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
      <div className='grid w-full'>
        {product.images ? (
          <div>
            <Gallery images={product.images} />

            {/* <Image
            src={product?.images?.[0]?.imageURL}
            alt='Product Image'
            width={100}
            height={100}
          /> */}

            {/* <ImageCollection
            value={product?.images?.map((images: any) => images.imageURL) || []}
            height={100}
            width={100}
          /> */}
          </div>
        ) : null}
        {/* <div>
          <div>Catalog: {product.catalog_id}</div>
          <div>
            {product.id}- {product.name}
          </div>
        </div> */}
        <div className='sm:col-span-8 lg:col-span-7'>
          <PreviewProduct
            data={product}
            onConfirm={previewModal.onClose}
            loading={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
