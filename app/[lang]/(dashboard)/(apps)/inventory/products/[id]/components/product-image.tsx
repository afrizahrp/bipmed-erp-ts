'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

import { ProductImages } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input_T';
import { Button } from '@/components/ui/button_T';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form_T';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select_T';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { FormBlockWrapper } from '@/app/shared/form-utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion_T';
import { resolve } from 'path';

const formSchema = z.object({
  imageURL: z.array(z.object({ imageURL: z.string() })),
  product_id: z.string().min(1).optional(),
  id: z.string().optional().nullable(),
});

type ProductImageFormValue = z.infer<typeof formSchema>;

interface ProductImageFormProps {
  initialData: ProductImages[] | null | undefined;
}

export const ProductImage: React.FC<ProductImageFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Product Product' : 'Add New Product';
  const description = initialData
    ? `Change Product ${initialData.product_id}-> ${initialData.product_id}`
    : 'Add New Product';
  const toastMessage = initialData
    ? 'Product has changed successfully.'
    : 'New Product has been added successfully.';
  const action = initialData ? 'Save Changes' : 'Save New Product';

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        id: '',
        product_id: '',
        imageURL: '',
      };

  const form = useForm<ProductImageFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      imageURL: [], // Provide a default value for imageURL
    },
  });

  const onSubmit = async (data: ProductImageFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${params.id}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.push('/inventory/products/product-list');
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.error(error); // Log the error to the console for debugging

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };
  console.log(initialData.product_id);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='flex gap-4'>
            <div className='w-1/2 flex-col gap-4'>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Id</FormLabel>
                    <FormControl>
                      <Input disabled placeholder='Id' {...field} />
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
          </div>

          <div className='w-1/2 flex-col gap-4 justify-end'>
            <FormField
              control={form.control}
              name='imageURL'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      //   value={field.value}
                      value={field.value?.map(
                        (ProductImages) => ProductImages.imageURL
                      )}
                      disabled={loading}
                      onChange={(imageURL) =>
                        field.onChange([...field.value, imageURL])
                      }
                      onRemove={(imageURL) =>
                        field.onChange(
                          field.value.filter((current) => current !== imageURL)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end space-x-4'>
            <Button
              onClick={() => router.push('/inventory/products/product-list')}
            >
              Back
            </Button>
            <Button disabled={loading} type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
