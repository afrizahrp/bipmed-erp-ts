'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  productImageFormSchema,
  ProductImageFormValues,
} from '@/utils/schema/productImage.form.schema';
import { ProductImages } from '@prisma/client';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';
import { toast } from 'react-hot-toast';

interface ProductImageFormProps {
  initialData: ProductImages[];
  product_id: string;
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({
  initialData,
  product_id,
}) => {
  const [images, setImages] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProductImageFormValues>({
    resolver: zodResolver(productImageFormSchema),
    defaultValues: {
      id: initialData.length > 0 ? initialData[0].id : '',
      imageURL: initialData.map((image) => image.imageURL),
      isPrimary:
        initialData.find((image) => image.isPrimary)?.isPrimary ?? false,
      product_id: initialData.length > 0 ? initialData[0].product_id : '',
    },
  });
  const onUpload = (result: any) => {
    form.setValue('imageURL', [
      ...form.getValues().imageURL,
      result.info.secure_url,
    ]);
  };
  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);
      const imageId = extractPublicIdFromCloudinaryUrl(imageURL);
      await axios.delete(`/api/system/cloudinary/${imageId}`);
      await axios.delete(`/api/inventory/productImages/${imageId}`);
      setImages(images.filter((image) => image.imageURL !== imageURL));
      form.setValue(
        'imageURL',
        images
          .filter((image) => image.imageURL !== imageURL)
          .map((image) => image.imageURL)
      );
      setLoading(false);
      toast.success('Image has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const handleUpdateImagePrimary = async (
    imageURL: string,
    newIsPrimary: boolean
  ) => {
    try {
      setLoading(true);
      const updatedImages = images.map((image) => ({
        ...image,
        isPrimary: image.imageURL === imageURL ? newIsPrimary : false,
      }));
      setImages(updatedImages);
      const imageId = extractPublicIdFromCloudinaryUrl(imageURL);
      await axios.patch(`/api/inventory/productImages/${imageId}`, {
        isPrimary: newIsPrimary,
      });
      setLoading(false);
      router.refresh();
      newIsPrimary
        ? toast.success('Image has been set as primary')
        : toast.success('Image has been set as non-primary');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductImageFormValues) => {
    try {
      setLoading(true);
      const datatoPost =
        typeof data.imageURL === 'string'
          ? data.imageURL
          : data.imageURL.map((imageURL) => ({
              id: extractPublicIdFromCloudinaryUrl(imageURL),
              imageURL,
              isPrimary:
                images.find((img) => img.imageURL === imageURL)?.isPrimary ||
                false,
              product_id,
            }));
      await axios.post(`/api/inventory/productImages`, datatoPost);
      router.refresh();
      toast.success('New images have been added successfully.');
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Save failed');
      setLoading(false);
    }
  };

  return (
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
                      images={images}
                      onChange={(imageURL) =>
                        field.onChange([...field.value, imageURL])
                      }
                      onRemove={(imageURL) => {
                        handleImageRemove(imageURL);
                        const newValue = Array.isArray(field.value)
                          ? field.value.filter(
                              (url: string) => url !== imageURL
                            )
                          : [];
                        field.onChange(newValue);
                      }}
                      onUpdatePrimary={(imageURL, isPrimary) =>
                        handleUpdateImagePrimary(imageURL, isPrimary)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='w-full flex items-left justify-start gap-x-6'>
            <CldUploadWidget
              onUpload={onUpload}
              options={{
                sources: ['local'],
                resourceType: 'image',
                multiple: true,
              }}
              uploadPreset='uploadBiwebapp'
            >
              {({ open }) => {
                const onClick = () => open();
                return (
                  <Button
                    type='button'
                    disabled={loading}
                    variant='outline'
                    onClick={onClick}
                  >
                    {loading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    <ImagePlus className='h-4 w-4 mr-2' />
                    Upload
                  </Button>
                );
              }}
            </CldUploadWidget>
            {images && (
              <Button disabled={loading} type='submit'>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {loading ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

function extractPublicIdFromCloudinaryUrl(imageURL: string): string | null {
  const parts = imageURL.split('/');
  const fileName = parts.pop();
  if (typeof fileName === 'string') {
    const id = fileName.split('.')[0];
    return id;
  } else {
    console.error('fileName is not a string');
    return null;
  }
}

export default ProductImageForm;
