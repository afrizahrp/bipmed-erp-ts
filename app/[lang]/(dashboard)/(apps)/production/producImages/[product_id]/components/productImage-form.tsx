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

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  id: z.string().optional().nullable(),
  product_id: z.string().min(1).optional(),
  imageURL: z.string().min(3).optional(),
  isPrimary: z.boolean().optional(),
});

type ProductImageFormValues = z.infer<typeof formSchema>;

interface ProducImageFormProps {
  imageData: ProductImages[] | null;
}

export const ProducImageForm: React.FC<ProducImageFormProps> = ({
  imageData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = imageData ? 'Edit Product Image' : 'Add New Product Image';
  const description = imageData
    ? 'Change Product Image'
    : 'Add New Product Image';
  const toastMessage = imageData
    ? 'Product Image has changed successfully.'
    : 'New Product Image has been added successfully.';
  const action = imageData ? 'Save Changes' : 'Save New Product Image';

  const defaultValues = imageData
    ? {
        ...imageData,
      }
    : {
        imageURL: '',
        isPrimary: false,
      };

  const form = useForm<ProductImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductImageFormValues) => {
    try {
      setLoading(true);
      if (imageData) {
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='product_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Id</FormLabel>
                  <FormControl>
                    <Input disabled placeholder='Id' {...field} />
                  </FormControl>
                  {form.formState.errors.product_id && (
                    <FormMessage>
                      {form.formState.errors.product_id.message}
                    </FormMessage>
                  )}{' '}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-center justify-between px-3 py-20 top-13'>
            <Button disabled={loading} className='ml-auto' type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>
      {/* </div>
      </div> */}
    </>
  );
};
