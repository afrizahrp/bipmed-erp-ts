import { prisma } from '@/lib/client';

import ProductDialog from './product-dialog';

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

  return (
    <div className='p-8 max-w-md space-y-2'>
      <ProductDialog product={product} />
    </div>
  );
};

export default QuickEditProduct;
