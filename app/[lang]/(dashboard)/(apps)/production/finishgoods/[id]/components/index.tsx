'use client';
import axios from 'axios';
import useProductStore from '@/store/useProductStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePageStore from '@/store/usePageStore'; // Import store Zustand

import { toast } from 'react-hot-toast';

import { Element } from 'react-scroll';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from '@/utils/class-names';
import FormNav, { formParts } from './form-nav';

import { Products, ProductSpecs, ProductDescs } from '@prisma/client';
import { ProductSpecForm } from './product-spec-form';
import { FinishGoodsForm } from './finish-goods-form';
// import ProductImageForm from './productImage-form';
import FormFooter from '@/components/form-footer';

import {
  productspecsdescsCombinedSchema,
  CombinedProductFormValues,
} from '@/utils/schema/product.specs.descs.form.schema';

import { defaultValues } from '@/utils/defaultvalues/product-descs-specs.combined.defaultValues';

const MAP_STEP_TO_COMPONENT = {
  [formParts.general]: FinishGoodsForm,
  [formParts.specs]: ProductSpecForm,
};

interface IndexProps {
  product_id: string;
  initialProductData: Products | null;
  initialProductSpecData: ProductSpecs | null;
  initialProductDescsData: ProductDescs | null;
  className?: string;
}

export default function ProductDetailPage({
  product_id,
  initialProductData,
  initialProductSpecData,
  initialProductDescsData,
  className,
}: IndexProps) {
  const router = useRouter(); // ✅ Panggil useRouter di tingkat atas
  const { currentPage } = usePageStore(); // ✅ Panggil usePageStore di tingkat atas
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string>('');

  const navigateToSavedPage = () => {
    const constructUrl = (page: number) => {
      const url = new URL(window.location.href);
      url.pathname = '/en/production/finishgoods/finishgoods-list';
      url.searchParams.set('page', page.toString());
      url.hash = ''; // Clear the fragment identifier
      return url.toString();
    };

    const constructedUrl = constructUrl(currentPage);
    router.push(constructedUrl);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(false);
    navigateToSavedPage();
  };

  const action = initialProductData ? 'Update' : 'Save';
  const description = initialProductData
    ? `Change Product ${initialProductData.id}-> ${initialProductData.name}`
    : 'Add New Product';
  const toastMessage = initialProductData
    ? 'Changes have been saved successfully.'
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

  const resetProductId = useProductStore((state) => state.resetProductId);

  if (product_id === 'new') {
    resetProductId();
    useProductStore.setState({ productId: product_id });
  }

  const onSubmit: SubmitHandler<CombinedProductFormValues> = async (data) => {
    try {
      setLoading(true);
      let tempProductId = product_id;

      if (!initialProductData) {
        const productResponse = await axios.post(
          `/api/inventory/products`,
          data
        );
        tempProductId = productResponse.data.id;
        useProductStore.setState({ productId: tempProductId });
        product_id = tempProductId;
      } else {
        await axios.patch(`/api/inventory/products/${product_id}`, data);
      }

      if (initialProductSpecData) {
        await axios.patch(`/api/inventory/productSpecs/${product_id}`, data);
      } else if (data.construction && data.construction.trim() !== '') {
        await axios.post(`/api/inventory/productSpecs`, {
          ...data,
          id: product_id,
        });
      }

      if (initialProductDescsData) {
        await axios.patch(`/api/inventory/productDescs/${product_id}`, data);
      } else if (data.descriptions && data.descriptions.trim() !== '') {
        await axios.post(`/api/inventory/productDescs`, {
          ...data,
          id: product_id,
        });
      }

      navigateToSavedPage();
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.error('Error while submitting the form:', error);
      toast.error('An error occurred while saving the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
                <Component
                  product_id={product_id}
                  initialProductData={initialProductData}
                  initialProductSpecData={initialProductSpecData}
                  className='pt-7 @2xl:pt-9 @3xl:pt-11'
                />
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={loading}
            handleAltBtn={handleBack}
            submitBtnText={action}
          />
        </form>
      </FormProvider>
    </div>
  );
}
