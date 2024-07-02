'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import usePreviewModal from '@/hooks/use-preview-modal';

import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';

import { toast } from 'react-hot-toast';
import { routes } from '@/config/routes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { SearchColumnProductCategory } from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Products,
  ProductImages,
} from '@prisma/client';


import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

interface PreviewProductProps {
  data:  any
  onConfirm: () => void;
  loading: boolean;
}

export const PreviewProduct: React.FC<PreviewProductProps> = ({
  data,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isloading, setisLoading] = useState(false);

  const defaultValues = {
    id: data.id,
    images: data?.images || [],

    catalog_id: data.catalog_id,
    name: data.name,
    category_id: data.category_id,
    iStatus: data.iStatus,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleBack = (e: any) => {
    e.preventDefault();
    setisLoading(false);
  };

  return (
    <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onConfirm)}
          className='space-y-8 w-full'
        >
          {/* <div className='w-full flex items-center'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <ImageCollection
                      value={
                        field.value?.map(
                          (ProductImages) => ProductImages.imageURL
                        ) || []
                      }
                      disabled={loading}
                      height={100}
                      width={100}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div> */}

          <div className='w-[300px]'>
            {/* <div className='flex px-3 gap-x-4'> */}{' '}
            {/* Add this wrapper with flexbox */}
            <FormField
              control={form.control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <SearchColumnProductCategory
                    {...field}
                    currentValue={field.value ?? ''}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name='iStatus'
              render={({ field }) => (
                <FormItem>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {/* Inline style for closer alignment */}
                    <FormLabel>Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={(checked) => {
                        // Assuming `field.onChange` can handle boolean values directly
                        // If not, you might need to adapt this to your form library's needs
                        field.onChange(checked);
                      }}
                      disabled={loading}
                      style={{
                        backgroundColor: field.value ? 'gray' : 'green',
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>
                          Non Active
                        </span>
                      ) : (
                        <span className='text-green'>Active</span>
                      )}{' '}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {/* </div> */}
        </form>
      </Form>
    </div>
  );
};
