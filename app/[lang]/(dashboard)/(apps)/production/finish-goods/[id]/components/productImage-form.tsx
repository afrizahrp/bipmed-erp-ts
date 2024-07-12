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

// import {
//   productImageFormSchema,
//   ProductImageFormValues,
// } from '@/utils/schema/productImage.form.schema';

import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

import { Products, ProductImages } from '@prisma/client';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';
import { toast } from 'react-hot-toast';
import { FcPrevious } from 'react-icons/fc';

interface ProductImageFormProps {
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({ initialData }) => {
  // State to manage image URLs
  const [images, setImages] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        images: initialData?.images || [],
        catalog_id: initialData?.catalog_id ?? '',
        registered_id: initialData?.registered_id ?? '',
        id: initialData?.id ?? '',
        name: initialData?.name ?? '',
        category_id: initialData?.category_id ?? '',
        subCategory_id: initialData?.subCategory_id ?? '',
        brand_id: initialData?.brand_id ?? '',
        uom_id: initialData?.uom_id ?? '',
        tkdn_pctg: initialData?.tkdn_pctg ?? 0,
        bmp_pctg: initialData?.bmp_pctg ?? 0,
        ecatalog_URL: initialData?.ecatalog_URL ?? '',
        iStatus: initialData?.iStatus ?? true,
        remarks: initialData?.remarks || undefined,
        isMaterial: initialData?.isMaterial ?? false,
        slug: initialData?.slug ?? '',
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
        iStatus: true,
        remarks: '',
        isMaterial: false,
        slug: '',
        iShowedStatus: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl({
        url: [imageURL],
      });

      console.log(imageId);
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

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${data.id}`, data);
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
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormControl className='flex flex-col gap-3'>
                      <GalleryWithUpload
                        images={field.value.map((image) => image.imageURL)}
                        onChange={(imageURL) =>
                          field.onChange([
                            ...field.value,
                            {
                              imageURL,
                              id: extractPublicIdFromCloudinaryUrl({
                                url: [imageURL],
                              }),
                            },
                          ])
                        }
                        onRemove={(imageURL) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.imageURL !== imageURL
                            ),
                          ])
                        }
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
