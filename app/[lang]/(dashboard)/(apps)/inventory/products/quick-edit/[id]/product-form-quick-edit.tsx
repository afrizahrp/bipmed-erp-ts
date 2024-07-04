'use client';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import usePreviewModal from '@/hooks/use-preview-modal';

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

interface ProducFormQuickEditProps {
  data: any;
}

const ProducFormQuickEdit: React.FC<ProducFormQuickEditProps> = ({ data }) => {
  const previewModal = usePreviewModal();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaultValues = {
    ...data,
    // id: data.id,
    // catalog_id: data.catalog_id,
    // name: data.name,
    // category_id: data.category_id,
    // iStatus: data.iStatus,
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

  const onClosePreviewModal = (e: any) => {
    e.preventDefault();

    router.back();
  };

  // const onSubmit = () => {
  async function onSubmit(data: ProductFormValues): Promise<void> {
    try {
      console.log('product-form-quick-edit', data);
      // setLoading(true);
      await axios.patch(`/api/inventory/products/${data.id}`, data);
      toast.success('Product has changed successfully.');
      router.push('/inventory/products/product-list');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      // setLoading(false);
      // setOpen(false);
    }
  }

  return (
    <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='w-[300px]'>
            <FormField
              control={form.control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>

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
                      // disabled={loading}
                      style={{
                        backgroundColor: field.value ? 'green' : 'gray',
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>Active</span>
                      ) : (
                        <span className='text-green'> Non Active</span>
                      )}{' '}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button
              onClick={onClosePreviewModal}
              // disabled={loading}
              className='ml-auto'
              variant='outline'
            >
              Cancel
            </Button>

            <Button
              // disabled={loading}
              className='ml-auto'
              type='submit'
              onClick={(event) => {
                event.preventDefault(); // Prevent default if necessary
                const data = { ...form.getValues() };
                onSubmit(data);
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProducFormQuickEdit;
