import { prisma } from '@/lib/client';
import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';

import PreviewModal from './preview-modal';

interface QuickEditProductProps {
  open: boolean;
  onClose: () => void;
}

const QuickEditProduct = async ({
  params,
}: {
  params: {
    id: string;
    category_id: string;
    subCategory_id: string;
    brand_id: string;
    uom_id: string;
  };
}) => {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
    },
  });

  console.log('quick-edit', product?.id);

  // if (!product) {
  //   return null;
  // }

  return (
    // <div> Quick edit : {product?.id}</div>
    <PreviewModal />
    // <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
    //   <div className='grid grid-cols-[6fr,3fr] gap-8'>
    //     <div>
    //       {/* Product Id / Name */}
    //       <div className='grid w-full items-start'>
    //         <div>Catalog: {product.catalog_id}</div>
    //         <div>
    //           Product: {product.id}-{product.name}
    //         </div>
    //       </div>

    //       <div>
    //         <ProductFormQuickEdit data={product} loading={false} />
    //       </div>
    //     </div>

    //     {/* <div className='w-full'>
    //       {product && product.images && (
    //         <div>
    //           <Gallery images={product.images} />
    //         </div>
    //       )}
    //     </div> */}
    //   </div>
    // </Modal>
  );
};

export default QuickEditProduct;
