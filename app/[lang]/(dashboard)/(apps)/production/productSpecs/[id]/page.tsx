import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card_T';
import { ProductDetail } from './components/index';
import { ProductSpecForm } from './components/product-spec-form';

const ProductSpecsPage = async ({
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
  const productSpec = await prisma.productSpecs.findUnique({
    where: {
      id: params.id,
    },
  });

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

export default ProductSpecsPage;
