import { prisma } from '@/lib/client';

import usePreviewModal from '@/hooks/use-preview-modal';

import PreviewModal from '../../../quick-edit/[id]/preview-modal';
import { Products } from '@/types';

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
  const previewModal = usePreviewModal();

  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
    },
  });

  //   const products: Products = {
  //     ...product,
  //     images:
  //       product?.images?.map((image) => ({
  //         id: 0,
  //         product_id: product?.id,
  //         imageURL: image,
  //         isPrimary: false,
  //       })) || [],
  //   };

  //   previewModal.onOpen(product);

  return null;
};

export default QuickEditProduct;
