'use client';
import axios from 'axios';
import useProductStore from '@/store/useProductStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { toast } from 'react-hot-toast';

import { Element } from 'react-scroll';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from '@/utils/class-names';
import FormNav, { formParts } from './form-nav';
// import { Button } from '@/components/ui/button';

import {
  Products,
  ProductSpecs,
  ProductDescs,
  Categories,
  SubCategories,
  Uoms,
  Brands,
} from '@prisma/client';
import { ProductSpecForm } from './product-spec-form';
import { FinishGoodsForm } from './finish-goods-form';
import { ProductDescsForm } from './product-descs-form';
import ProductImageForm from './productImage-form';
import FormFooter from '@/components/form-footer';

import {
  productspecsdescsCombinedSchema,
  CombinedProductFormValues,
} from '@/utils/schema/product.specs.descs.form.schema';

import { defaultValues } from '@/utils/defaultvalues/product-descs-specs.combined.defaultValues';

const MAP_STEP_TO_COMPONENT = {
  [formParts.general]: FinishGoodsForm,
  [formParts.specs]: ProductSpecForm,
  [formParts.descs]: ProductDescsForm,
};

interface IndexProps {
  product_id: string;
  initialProductData: Products | null;
  categories: Categories[];
  subCategories: SubCategories[];
  uoms: Uoms[];
  brands: Brands[];
  initialProductDescsData: ProductDescs | null;
  initialProductSpecData: ProductSpecs | null;
  className?: string;
}

export default function ProductDetailPage({
  product_id,
  initialProductData,
  categories,
  subCategories,
  uoms,
  brands,
  initialProductDescsData,
  initialProductSpecData,
  className,
}: IndexProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string>('');
  let action = 'Save';
  let id: string;

  const description = initialProductData
    ? `Change Product ${initialProductData.id}-> ${initialProductData.name}`
    : 'Add New Product';
  const toastMessage = initialProductData
    ? 'Changes has saved successfully.'
    : 'New product has been added successfully.';

  const methods = useForm<CombinedProductFormValues>({
    resolver: zodResolver(productspecsdescsCombinedSchema),
    defaultValues: defaultValues(
      initialProductData ?? {
        id: '',
        catalog_id: '',
        registered_id: '',
        name: '',
        category_id: '',
        tkdn_pctg: 0,
        bmp_pctg: 0,
        ecatalog_URL: '',
        iStatus: true,
        remarks: '',
        slug: '',
        isMaterial: false,
        iShowedStatus: false,
      },

      initialProductDescsData ?? {
        id: '',
        descriptions: '',
        benefit: '',
      },
      initialProductSpecData ?? {
        id: '',
        construction: '',
        base: '',
        bodyFrame: '',
        itemFunctions: '',
        item_type: '',
        item_model: '',
        mattress: '',
        mattressSize: '',
        mattressThickness: '',
        finishing: '',
        dimension: '',
        powerSupply: '',
        loadCapacity: '',
        systemFilter: '',
        accessories: '',
        sideRail: '',
        ivStand: '',
        wheels: '',
        maxLoad: '',
        size: '',
        weight: '',
        standSize: '',
        position: '',
        basePlate: '',
        cover: '',
        material: '',
        coverMaterial: '',
        typeScreen: '',
        powerConsumption: '',
        lamp: '',
        movers: '',
        rim: '',
        custodyFeet: '',
        foot: '',
        footWear: '',
        pole: '',
        inputVoltage: '',
        outputVoltage: '',
        sideGuard: '',
        footandheadPanel: '',
        temperatureControl: '',
        top: '',
        foodTray: '',
        traycorpse: '',
        pillowthecorpse: '',
        lightPole: '',
        sterilizing: '',
        filter: '',
        underPressure: '',
        foundationTray: '',
        door: '',
        handle: '',
        medicineBox: '',
        handleTrolley: '',
        drawer: '',
        systemControl: '',
        bodyFrameWork: '',
        specremarks: '',
      }
    ),
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push(routes.cms.products);
    // router.push('/cms/products/product-list');

    return;
  };

  const resetProductId = useProductStore((state) => state.resetProductId);

  if (product_id !== 'new') {
    id = product_id;
    action = 'Update';
  } else {
    action = 'Save';
    id = '';
    resetProductId();
    useProductStore.setState({ productId: product_id });
  }

  const onSubmit: SubmitHandler<CombinedProductFormValues> = async (data) => {
    try {
      setLoading(true);
      let tempProductId: '';
      resetProductId();
      if (!initialProductData) {
        tempProductId = '';

        const productResponse = await axios.post(
          `/api/inventory/products`,
          data
        );
        tempProductId = productResponse.data.id;

        useProductStore.setState({ productId: tempProductId });
        product_id = tempProductId;

        <ProductImageForm product_id={tempProductId} initialData={[]} />;
      } else {
        await axios.patch(`/api/inventory/products/${product_id}`, data);
      }

      if (initialProductSpecData) {
        await axios.patch(`/api/inventory/productSpecs/${product_id}`, data);
      } else {
        if (
          typeof data.construction === 'string' &&
          data.construction.trim() !== ''
        ) {
          try {
            await axios.post(`/api/inventory/productSpecs`, {
              ...data,
              id: product_id,
            });
          } catch (error) {
            console.error('Failed to post product specs:', error);
          }
        }
      }

      if (!initialProductDescsData) {
        if (
          typeof data.descriptions === 'string' &&
          data.descriptions.trim() !== ''
        ) {
          try {
            await axios.post(`/api/inventory/productDescs`, {
              ...data,
              id: product_id,
            });
          } catch (error) {
            console.error('Failed to post product descs:', error);
          }
        }
      } else {
        await axios.patch(`/api/inventory/productDescs/${product_id}`, data);
      }
      // router.back();
      // router.push(routes.cms.products);
      // router.refresh();
      action = 'Update';
      toast.success(toastMessage);
    } catch (error) {
    } finally {
      setLoading(false)
      router.back();
      router.push(routes.cms.products);
    }
  };

  return (
    <>
      <div className='@container'>
        <FormNav className={cn('z-[999] 2xl:top-[64px]')} />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={cn(
              'relative z-[19] [&_label.block>span]:font-medium',
              className
            )}
          >
            <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11'>
              {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
                <Element
                  key={key}
                  name={formParts[key as keyof typeof formParts]}
                >
                  {key === formParts.general && (
                    <Component
                      product_id={product_id}
                      initialProductData={initialProductData}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      uoms={uoms}
                      initialProductDescsData={initialProductDescsData}
                      initialProductSpecData={initialProductSpecData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}
                  {key === formParts.specs && (
                    <Component
                      product_id={product_id}
                      initialProductData={initialProductData}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      uoms={uoms}
                      initialProductDescsData={initialProductDescsData}
                      initialProductSpecData={initialProductSpecData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}
                  {key === formParts.descs && (
                    <Component
                      product_id={product_id}
                      initialProductData={initialProductData}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      uoms={uoms}
                      initialProductSpecData={initialProductSpecData}
                      initialProductDescsData={initialProductDescsData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}

                  {key !== formParts.general &&
                    key !== formParts.specs &&
                    key !== formParts.descs && (
                      <Component
                        product_id={product_id}
                        initialProductData={initialProductData}
                        categories={categories}
                        subCategories={subCategories}
                        brands={brands}
                        uoms={uoms}
                        initialProductDescsData={initialProductDescsData}
                        initialProductSpecData={initialProductSpecData}
                        className='pt-7 @2xl:pt-9 @3xl:pt-11'
                      />
                    )}
                </Element>
              ))}
            </div>

            {/* <Button className='w-full' variant='outline' onClick={handleBack}>
              Back
            </Button> */}

            <FormFooter
              isLoading={loading}
              handleAltBtn={handleBack}
              submitBtnText={action}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
