'use client';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Element } from 'react-scroll';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from '@/utils/class-names';
import FormNav, { formParts } from './form-nav';

import {
  Products,
  ProductSpecs,
  ProductDescs,
  // Categories,
  // SubCategories,
  // Brands,
  // Uoms,
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

import { routes } from '@/config/routes';

const MAP_STEP_TO_COMPONENT = {
  [formParts.general]: FinishGoodsForm,
  [formParts.descs]: ProductDescsForm,
  [formParts.specs]: ProductSpecForm,
};

interface IndexProps {
  product_id: string;
  initialProductData: Products | null;
  initialProductDescsData: ProductDescs | null;
  initialProductSpecData: ProductSpecs | null;
  className?: string;
}

export default function ProductDetailPage({
  product_id,
  initialProductData,
  initialProductDescsData,
  initialProductSpecData,
  className,
}: IndexProps) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  let id: string;

  if (product_id !== 'new') {
    id = product_id;
  } else {
    id = '';
  }
  console.log('product_id:', id);

  const description = initialProductData
    ? `Change Product ${initialProductData.id}-> ${initialProductData.name}`
    : 'Add New Product';
  const toastMessage = initialProductData
    ? 'Changes has saved successfully.'
    : 'New product has been added successfully.';
  const action = initialProductData ? 'Save Changes' : 'Save New Product';

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
        title: '',
        descriptions: '',
        features: '',
        footers: '',
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
    router.push('/production/finishgoods/finishgoods-list');
  };

  const onSubmit: SubmitHandler<CombinedProductFormValues> = async (data) => {
    try {
      setLoading(true);
      let productId = product_id; // Use existing id if available

      if (!initialProductData) {
        const productResponse = await axios.post(
          `/api/inventory/products`,
          data
        );
        productId = productResponse.data.id; // Assuming the response contains the new product's id
        product_id = productId;
        <ProductImageForm product_id={productId} initialData={[]} />;
      } else {
        await axios.patch(`/api/inventory/products/${product_id}`, data);
      }

      if (initialProductSpecData) {
        await axios.patch(`/api/inventory/productSpecs/${productId}`, data);
      } else {
        if (
          typeof data.construction === 'string' &&
          data.construction.trim() !== ''
        ) {
          try {
            await axios.post(`/api/inventory/productSpecs`, {
              ...data,
              id: productId,
            });
          } catch (error) {
            console.error('Failed to post product specs:', error);
          }
        } else {
          if (initialProductDescsData) {
            await axios.patch(`/api/inventory/productDescs/${productId}`, data);
          } else {
            if (typeof data.title === 'string' && data.title.trim() !== '') {
              try {
                await axios.post(`/api/inventory/productDescs`, {
                  ...data,
                  id: productId, // Use the obtained productId for new productDescs
                });
              } catch (error) {
                console.error('Failed to post product descs:', error);
              }
            } else {
              console.error('Invalid data:', data);
            }
          }

          console.error('Invalid data:', data);
        }
      }
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
    } finally {
      setLoading(false);
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
                      initialProductDescsData={initialProductDescsData}
                      initialProductSpecData={initialProductSpecData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}

                  {key === formParts.descs && (
                    <Component
                      product_id={product_id}
                      initialProductData={initialProductData}
                      initialProductSpecData={initialProductSpecData}
                      initialProductDescsData={initialProductDescsData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}
                  {key === formParts.specs && (
                    <Component
                      product_id={product_id}
                      initialProductData={initialProductData}
                      initialProductDescsData={initialProductDescsData}
                      initialProductSpecData={initialProductSpecData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}

                  {key !== formParts.general &&
                    key !== formParts.descs &&
                    key !== formParts.specs && (
                      <Component
                        product_id={product_id}
                        initialProductData={initialProductData}
                        initialProductDescsData={initialProductDescsData}
                        initialProductSpecData={initialProductSpecData}
                        className='pt-7 @2xl:pt-9 @3xl:pt-11'
                      />
                    )}
                </Element>
              ))}
            </div>

            <FormFooter
              isLoading={loading}
              handleAltBtn={handleBack}
              submitBtnText={id ? 'Update' : 'Save'}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
