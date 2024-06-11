import { prisma } from '@/lib/client';
import { Card, CardContent } from '@/components/ui/card_T';

// import { ProductDetail } from './components/index';
import { ProductForm } from './components/product-form';
import { ProductSpecForm } from './components/product-spec-form';
import { ProductStock } from './components/product-stock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion_T';
// import FormFooter from '@/components/form-footer';
const ProductPage = async ({
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
      specs: true,
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

  const categories = await prisma.categories.findMany({
    where: {
      id: params.category_id,
      type: '1',
      iStatus: false,
    },
  });

  const subCategories = await prisma.subCategories.findMany({
    where: {
      category_id: params.category_id,
      id: params.subCategory_id,
    },
  });

  const brands = await prisma.brands.findMany({
    where: {
      id: params.brand_id,
    },
  });

  const uoms = await prisma.uoms.findMany({
    where: {
      id: params.uom_id,
    },
  });

  return (
    <>
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}
      {/* <ProductDetail /> */}

      {/* <ProductImage initialData={productImages} /> */}

      <Card>
        <CardContent className='space-y-2'>
          <Accordion
            defaultValue={['item-1']}
            type='multiple'
            className='w-full'
          >
            {/* <AccordionItem value='item-1'>
              <AccordionTrigger>
                <div className='flex  pb-5 w-full'>
                  <h2 className='scroll-m-20 text-1xl font-semibold tracking-tight lg:text-2xl'>
                    Stock
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ProductStock />
              </AccordionContent>
            </AccordionItem> */}

            <AccordionItem value='item-1'>
              <AccordionTrigger>
                <div className='flex  w-full pb-5'>
                  <h2 className='text-1xl scroll-m-20 font-semibold tracking-tight lg:text-2xl'>
                    General Information
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ProductForm
                  initialData={product}
                  categories={categories}
                  subCategories={subCategories}
                  brands={brands}
                  uoms={uoms}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-2'>
              <AccordionTrigger>
                <div className='flex  w-full pb-5'>
                  <h2 className='text-1xl scroll-m-20 font-semibold tracking-tight lg:text-2xl'>
                    Specification
                  </h2>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div>
                  <ProductSpecForm initialData={productSpec} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <FormFooter
            // isLoading={isLoading}
            altBtnText="Cancel"
            submitBtnText="Save"
          />{' '} */}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductPage;
