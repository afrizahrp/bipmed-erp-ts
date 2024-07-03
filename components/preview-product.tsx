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
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { SearchColumnProductCategory } from '@/components/searchColumns';

import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface PreviewProductProps {
  data: any;
  loading: boolean;
  // onConfirm: () => void;
}

export const PreviewProduct: React.FC<PreviewProductProps> = ({
  data,
  // onConfirm,
  loading,
}) => {
  // const previewModal = usePreviewModal();

  const [isMounted, setIsMounted] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const defaultValues = data
    ? {
        ...data,
        images: data?.images || [],
        id: data?.id ?? '',
        name: data?.name ?? '',
        category_id: data?.category_id ?? '',
        iStatus: data?.iStatus ?? false,
      }
    : {
        images: [],
        catalog_id: undefined,

        id: '',
        name: '',
        category_id: '',
        iStatus: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  // const form = useForm<ProductFormValues>({
  //   resolver: zodResolver(productFormSchema),
  //   defaultValues,
  // });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onConfirm = () => {
    console.log('data', data);

    // try {
    //   setisLoading(true);
    //   await axios.patch(`/api/inventory/products/${data.id}`, values);
    //   toast.success('Product has changed successfully.');
    //   previewModal.onClose();
    //   router.refresh();
    // } catch (error) {
    //   toast.error('Something went wrong');
    // } finally {
    //   setisLoading(false);
    // }
  };

  // const onConfirm = async () => {
  //   try {
  //     // setLoading(true);
  //     await axios.patch(`/api/inventory/products/${data.id}`, data);
  //     toast.success('Product has changed successfully.');
  //     previewModal.onClose();

  //     router.refresh();
  //   } catch (error) {
  //     toast.error('Something went wrong');
  //   } finally {
  //     // setLoading(false);
  //     // setOpen(false);
  //   }
  // };

  return (
    <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onConfirm)}
          className='space-y-8 w-full'
        >
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
