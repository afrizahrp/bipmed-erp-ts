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

import { Input } from '@/components/ui/input';
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

import ImageCollection from '@/components/ui/images-collection';
import { Checkbox } from '@/components/ui/checkbox';

import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

interface AlertModalProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  data,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isloading, setisLoading] = useState(false);

  const defaultValues = {
    ...data,
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
    <Modal open={isOpen} onClose={onClose}>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onConfirm)}
            className='space-y-8 w-full'
          >
            <div className='grid grid-cols-3 gap-4 py-2'>
              <div>
                <FormField
                  control={form.control}
                  name='id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Id</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder='Id'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='catalog_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catalog</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Input catalog here'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                      {form.formState.errors.catalog_id && (
                        <FormMessage>
                          {form.formState.errors.catalog_id.message}
                        </FormMessage>
                      )}{' '}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 py-3'>
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
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                )}
              />
              <Button disabled={loading} variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} variant='soft' onClick={onConfirm}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
