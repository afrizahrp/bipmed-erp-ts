'use client';
import axios from 'axios';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// import usePreviewModal from '@/hooks/use-preview-modal';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SearchColumnProductCategory } from '@/components/searchColumns';

import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductFormQuickEditProps {
  data: any;
  loading: boolean;
  // onConfirm: () => void;
}

export const ProductFormQuickEdit: React.FC<ProductFormQuickEditProps> = ({
  data,
  // onConfirm,
  loading,
}) => {
  // const previewModal = usePreviewModal();

  const [isMounted, setIsMounted] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  console.log('data', data);

  const defaultValues = data
    ? {
        ...data,
        images: data?.images || [],
        catalog_id: data?.catalog_id ?? '',
        registered_id: data?.registered_id ?? '',
        id: data?.id ?? '',
        name: data?.name ?? '',
        category_id: data?.category_id ?? '',
        subCategory_id: data?.subCategory_id ?? '',
        brand_id: data?.brand_id ?? '',
        uom_id: data?.uom_id ?? '',
        tkdn_pctg: data?.tkdn_pctg ?? 0,
        bmp_pctg: data?.bmp_pctg ?? 0,
        ecatalog_URL: data?.ecatalog_URL ?? '',
        iStatus: data?.iStatus ?? false,
        remarks: data?.remarks || undefined,
        isMaterial: data?.isMaterial ?? false,
        slug: data?.slug ?? '',
      }
    : {
        images: [],
        catalog_id: undefined,
        registered_id: undefined,
        id: '',
        name: '',
        category_id: '',
        subCategory_id: '',
        brand_id: '',
        uom_id: '',
        tkdn_pctg: 0,
        bmp_pctg: 0,
        ecatalog_URL: '',
        iStatus: false,
        remarks: '',
        isMaterial: false,
        slug: '',
        iShowedStatus: true,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const onConfirm = async (data: ProductFormValues) => {
    try {
      setisLoading(true);
      await axios.patch(`/api/inventory/products/${data.id}`, data);
      toast.success('Product has changed successfully.');
      router.push('/inventory/products/product-list');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onConfirm)}
          className='space-y-8 w-full'
        >
          <div className='w-3/4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Input product name here'
                      {...field}
                      onChange={field.onChange}
                      className='font-bold'
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}{' '}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-[300px]'>
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
                      onCheckedChange={field.onChange}
                      // onCheckedChange={(checked) => {
                      //   field.onChange(checked);
                      // }}
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
          <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className='ml-auto'
              variant='outline'
            >
              Cancel
            </Button>

            <Button
              onClick={onConfirm}
              disabled={loading}
              className='ml-auto'
              type='submit'
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
