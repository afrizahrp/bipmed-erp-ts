'use client';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useProductDialog from '@/hooks/use-product-dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { SearchColumnProductCategory } from '@/components/searchColumns';

import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';

interface ProducFormQuickEditProps {
  data: any;
}

const ProducFormQuickEdit: React.FC<ProducFormQuickEditProps> = ({ data }) => {
  const productDialog = useProductDialog();

  const [isMounted, setIsMounted] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');

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

  const onClosePreviewModal = (e: any) => {
    e.preventDefault();

    productDialog.onClose();
  };

  async function onSubmit(data: ProductFormValues): Promise<void> {
    try {
      setLoading(true);
      await axios.patch(`/api/inventory/products/${data.id}`, data);
      toast.success('Product has changed successfully.');
      productDialog.onClose();

      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  const onProductNameChange = (newCategoryName: string) => {
    setSearchTerms(newCategoryName);
  };

  return (
    <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3 w-full'
        >
          <div className='w-full'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Edit product name here'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onProductNameChange(e.target.value); // Call the new handler
                      }}
                      className='font-bold w-full'
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
            <ProductNameExist
              currentValue={searchTerms}
              onChange={onProductNameChange}
            />
          </div>

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
                      disabled={loading}
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
              className='ml-auto'
              variant='outline'
            >
              Cancel
            </Button>

            <Button
              disabled={loading}
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