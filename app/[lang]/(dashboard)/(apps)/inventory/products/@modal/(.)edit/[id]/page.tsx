import { prisma } from '@/lib/client';
import PreviewProduct from '../../../quick-edit/[id]/preview-modal';

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

  return (
    <div className='p-8 max-w-md space-y-2'>
      <h1 className='text-2xl'>Edit Product {product?.id}</h1>
      {/* <ProducFormQuickEdit data={product} /> */}
      <PreviewProduct data={product} />
    </div>
  );
};

export default QuickEditProduct;
