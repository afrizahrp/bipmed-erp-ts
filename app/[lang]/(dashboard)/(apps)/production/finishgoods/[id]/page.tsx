import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import ProducImageForm from './components/productImage-form';
import ProductDetailPage from './components';
// import { ProductForm } from './components/product-form';
// import { ProductSpecForm } from './components/product-spec-form';

const FinishGoodsPage = async ({
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

  const productImages = await prisma.productImages.findMany({
    where: {
      product_id: params.id,
    },
  });

  const productSpec = await prisma.productSpecs.findUnique({
    where: {
      id: params.id,
    },
  });

  const productDescs = await prisma.productDescs.findUnique({
    where: {
      id: params.id,
    },
  });

  // const categories = await prisma.categories.findMany({
  //   where: {
  //     id: params.category_id,
  //     type: '1',
  //     iStatus: false,
  //   },
  // });

  // const subCategories = await prisma.subCategories.findMany({
  //   where: {
  //     category_id: params.category_id,
  //     id: params.subCategory_id,
  //   },
  // });

  // const brands = await prisma.brands.findMany({
  //   where: {
  //     id: params.brand_id,
  //   },
  // });

  // const uoms = await prisma.uoms.findMany({
  //   where: {
  //     id: params.uom_id,
  //   },
  // });

  const pageHeader = {
    title: params.id ? 'Edit Finish Goods' : 'New Finish Goods',

    breadcrumb: [
      {
        name: 'List',
        href: routes.production.finishgoods,
      },
      {
        name: 'Finish Goods',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className='w-full flex gap-x-2'>
        <div className='w-1/2 lg:sticky top-20 h-max'>
          <Card>
            <CardContent className='pt-2'>
              <ProducImageForm
                initialData={productImages}
                product_id={params.id}
              />
            </CardContent>
          </Card>
        </div>

        <div className='w-1/2'>
          <Card>
            <CardContent className='pt-2'>
              <ProductDetailPage
                product_id={params.id}
                initialProductData={product}
                initialProductSpecData={productSpec}
                initialProductDescsData={productDescs}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FinishGoodsPage;
