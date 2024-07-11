import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import { ProductSpecForm } from '../../products/[id]/components/product-spec-form';

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

  return <ProductSpecForm specData={productSpec} />;
};

export default ProductSpecsPage;
