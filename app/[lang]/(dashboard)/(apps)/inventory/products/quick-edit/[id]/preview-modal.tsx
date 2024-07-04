'use client';

import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/modal';
import ProductFormQuickEdit from './product-form-quick-edit';
import PreviewModal from '@/components/preview-modal';

interface PreviewProductProps {
  data: any;
}

const PreviewProduct = ({ data }: PreviewProductProps) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);
  // const product = usePreviewModal(data); //usePreviewModal((state) => state.data);

  console.log('PreviewProduct', data);

  const closeModal = () => {
    previewModal.onClose();
    router.push('/inventory/products/product-list');
  };

  // if (!product) {
  //   return null;
  // }

  return (
    <PreviewModal isOpen={true} onClose={closeModal}>
      <div className='grid grid-cols-[6fr,3fr] gap-8'>
        <div>
          <div className='grid w-full items-start'>
            <div>Catalog: {data?.catalog_id}</div>
            <div>
              Product: {data?.id}-{data?.name}
            </div>
          </div>

          <div>
            <ProductFormQuickEdit data={data} />
          </div>
        </div>

        <div className='w-full'>
          {data && data.images && (
            <div>
              <Gallery images={data.images} />
            </div>
          )}
        </div>
      </div>
    </PreviewModal>
  );
};

export default PreviewProduct;
