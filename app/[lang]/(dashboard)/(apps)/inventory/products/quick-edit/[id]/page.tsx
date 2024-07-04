import { prisma } from '@/lib/client';
import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';

import ProducFormQuickEdit from './product-form-quick-edit';
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

  // const products: product = {
  //       ...product,
  //       images: product.images.map((image) => ({
  //         id: '',
  //         product_id: product.id,
  //         imageURL: image,
  //         isPrimary: false,
  //       })),
  //     };

  console.log('quick-edit', product?.id);

  return (
    <div className='p-8 max-w-md space-y-2'>
      {/* <h1 className='text-2xl'>Edit Product {product?.id}</h1> */}
      {/* <ProducFormQuickEdit data={product} /> */}
      <PreviewModal data={product} />
    </div>
  );
};

export default QuickEditProduct;
