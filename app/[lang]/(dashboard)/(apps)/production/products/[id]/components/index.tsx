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
// import { useLayout } from '@/hooks/use-layout';

import {
  Products,
  Categories,
  SubCategories,
  Brands,
  Uoms,
  ProductImages,
  ProductSpecs,
} from '@prisma/client';
import { ProductSpecForm } from './product-spec-form';
import { ProductForm } from './product-form';
import { defaultValues } from './form-utils';
import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

import { routes } from '@/config/routes';

const MAP_STEP_TO_COMPONENT = {
  [formParts.general]: ProductForm,
  [formParts.specs]: ProductSpecForm,
};

interface IndexProps {
  productId: string;
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
  specData: ProductSpecs | null;
  categories: Categories[];
  subCategories: SubCategories[];
  brands: Brands[];
  uoms: Uoms[];
  className?: string;
}

// console.log(productSpecData);
export default function ProductDetailPage({
  productId,
  initialData,
  specData,
  categories,
  subCategories,
  brands,
  uoms,
  className,
}: IndexProps) {
  // const { layout } = useLayout();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...defaultValues(initialData ?? {}, specData ?? {}),
    },

    // defaultValues(initialData ?? {}, specData ?? {}),
  });

  // const pageHeader = {
  //   title: initialData ? 'Edit Finish Goods' : 'New Finish Goods',

  //   breadcrumb: [
  //     {
  //       name: 'Dashboard',
  //       href: routes.production.dashboard,
  //     },
  //     {
  //       name: 'List',
  //       href: routes.production.products,
  //     },
  //     {
  //       name: initialData ? 'Finish Goods' : 'Finish Goods',
  //     },
  //   ],
  // };
  const description = initialData
    ? `Change Product ${initialData.id}-> ${initialData.name}`
    : 'Add New Product';
  const toastMessage = initialData
    ? 'Changes has saved successfully.'
    : 'New product has been added successfully.';
  const action = initialData ? 'Save Changes' : 'Save New Product';

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/production/products/product-list');
  };

  const id = params.id;

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      setLoading(true);

      if (specData) {
        await axios.patch(`/api/inventory/products/${productId}`, data);
        await axios.patch(`/api/inventory/productSpecs/${id}`, data);
      } else {
        console.log('create product spec data first row ', productId);
        // await axios.post(`/api/inventory/${params.id}/products`, data);
        await axios.post(`/api/inventory/productSpecs`, data);
      }

      // if (initialData) {
      //   await axios.patch(`/api/inventory/products/${initialData.id}`, data);
      // } else {
      //   await axios.post(`/api/${params.storeId}/products`, data);
      // }

      // if (productId) {
      //   await axios.patch(`/api/inventory/productSpecs/${productId}`, data);
      // } else {
      //   console.log('create spec data first row ', productId);
      //   await axios.post(`/api/${productId}/productSpecs`, data);
      // }

      router.push('/production/products/product-list');
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.error(error); // Log the error to the console for debugging

      toast.error(error.response?.data?.message || 'Save changes failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}

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
                      initialData={initialData}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      uoms={uoms}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}
                  {key === formParts.specs && (
                    <Component
                      specData={specData}
                      className='pt-7 @2xl:pt-9 @3xl:pt-11'
                    />
                  )}
                  {key !== formParts.general && key !== formParts.specs && (
                    <Component
                      initialData={initialData}
                      specData={specData}
                      categories={categories}
                      subCategories={subCategories}
                      brands={brands}
                      uoms={uoms}
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
