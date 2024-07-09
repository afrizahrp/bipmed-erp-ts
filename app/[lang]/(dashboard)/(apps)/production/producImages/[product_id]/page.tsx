import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { ProducImageForm } from './components/productImage-form';

const ProductImagePage = async ({
  params,
}: {
  params: {
    product_id: string;
  };
}) => {
  const productImage = await prisma.productImages.findMany({
    where: {
      product_id: params.product_id,
    },
  });

  return (
    <>
      <Card>
        <CardContent className='space-y-2'>
          <ProducImageForm imageData={productImage} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductImagePage;
