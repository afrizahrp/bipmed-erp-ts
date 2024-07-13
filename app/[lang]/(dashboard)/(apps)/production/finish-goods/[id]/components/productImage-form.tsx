'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
  productImageFormSchema,
  ProductImageFormValues,
} from '@/utils/schema/productImage.form.schema';

// import {
//   ProductFormValues,
//   productFormSchema,
// } from '@/utils/schema/product.form.schema';

// import { Products, ProductImages } from '@prisma/client';
import { ProductImages } from '@prisma/client';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';
import { toast } from 'react-hot-toast';

import { Switch } from '@/components/ui/switch';
interface ProductImageFormProps {
  initialData: ProductImages[];
  product_id: string;
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({
  initialData,
  product_id,
}) => {
  // State to manage image URLs

  console.log('product id', product_id);
  const [images, setImages] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    imageURL: initialData.map((image) => image.imageURL),
    isPrimary: initialData.find((image) => image.isPrimary)?.isPrimary ?? false,
    product_id: initialData.length > 0 ? initialData[0].product_id : '',
  };

  const form = useForm<ProductImageFormValues>({
    resolver: zodResolver(productImageFormSchema),
    defaultValues: {
      imageURL: initialData.map((image) => image.imageURL),
      isPrimary:
        initialData.find((image) => image.isPrimary)?.isPrimary ?? false,
      product_id: initialData.length > 0 ? initialData[0].product_id : '',
    },
  });

  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl({
        url: [imageURL],
      });

      // await axios.delete(`/api/system/cloudinary/${imageId}`);
      // await axios.delete(`/api/inventory/productImages/${imageId}`);

      setLoading(false);
      toast.success('Image has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const actionMessage = 'New images has added successfully.';

  console.log('initialData', initialData);

  const onSubmit = async (data: ProductImageFormValues) => {
    try {
      setLoading(true);
      if (initialData && initialData.length > 0) {
        console.log('patch data', data);
        await axios.patch(`/api/inventory/productImages/${data.id}`, data);
      } else {
        // const  publicId = extractPublicIdFromCloudinaryUrl({
        //   url : data.imageURL[]
        // }),
        console.log('post data', data);

        await axios.post(`/api/inventory/productImages`, data);
      }

      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-full flex flex-col gap-6 drop-shadow-md justify-center px-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <div className='w-full flex items-center'>
              <FormField
                control={form.control}
                name='imageURL'
                render={({ field }) => (
                  <FormItem>
                    <FormControl className='flex flex-col gap-3'>
                      <GalleryWithUpload
                        images={field.value as string[]}
                        onChange={(imageURL) =>
                          field.onChange([...field.value, imageURL])
                        }
                        onRemove={(imageURL) => {
                          handleImageRemove(imageURL);
                          // Ensure field.value is treated as an array before filtering
                          const newValue = Array.isArray(field.value)
                            ? field.value.filter(
                                (url: string) => url !== imageURL
                              )
                            : [];
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full flex items-left justify-start'>
              {images && (
                <Button
                  disabled={loading}
                  type='submit'
                  onClick={(event) => {
                    event.preventDefault(); // Prevent default if necessary
                    const data = { ...form.getValues() };
                    onSubmit(data);
                  }}
                >
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

function extractPublicIdFromCloudinaryUrl(arg0: { url: string[] }): string {
  const { url } = arg0;
  const publicIds: string[] = [];

  url.forEach((imageUrl) => {
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      publicIds.push(publicId);
    }
  });

  return publicIds.join(',');
}

export default ProductImageForm;
