'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';

import { toast } from 'react-hot-toast';
import { MoreVertical } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import {
  SearchColumnProductCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';
import { Checkbox } from '@/components/ui/checkbox';

import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

import { ProductColumn } from './columns';

// interface CellActionProps {
//   data: ProductColumn;
// }

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  console.log('onConfirm', data.id);

  const onConfirm = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${data.id}`);
    //   toast.success('Product deleted.');
    //   router.refresh();
    // } catch (error) {
    //   toast.error('Something went wrong');
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };

  return (
    <>
      <AlertModal
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <Button
        variant='ghost'
        className='h-8 w-8 p-0'
        onClick={() => setOpen(true)}
      >
        <span className='sr-only'>Open menu</span>
        <MoreVertical className='h-4 w-4' />
      </Button>

      {/* <Form {...form}>
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
          </div>

          <div className='grid grid-cols-4 gap-4 py-3'>
            <div>
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
          </div>
        </form>
      </Form> */}
    </>
  );
};
