import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card_T';
import { ProductSpecForm } from './product-spec-form-old';

const ProductSpec = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const productSpec = await prisma.productSpecs.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(productSpec);

  return (
    <>
      <Card>
        <CardContent className='space-y-2'>
          <ProductSpecForm initialData={productSpec} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductSpec;
