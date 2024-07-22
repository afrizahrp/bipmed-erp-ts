'use client';
import axios from 'axios';
import useProductStore from '@/store/useProductStore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  productImageFormSchema,
  ProductImageFormValues,
} from '@/utils/schema/productImage.form.schema';
import { ProductImages } from '@prisma/client';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';
import { toast } from 'react-hot-toast';

interface ProductImageFormProps {
  product_id: string;
  initialData: ProductImages[];
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({
  product_id,
  initialData,
}) => {
  const productId = useProductStore((state) => state.productId);
  const [images, setImages] = useState(initialData);
  const [loading, setLoading] = useState(false);

  if (product_id === '' || product_id === 'new') {
    product_id = productId;
  }

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

  const onUpload = async (result: any) => {
    const newImage = result.info.secure_url;
    const updatedImages = [...form.getValues().imageURL, newImage];

    const imageId = extractPublicIdFromCloudinaryUrl(newImage);

    // Create a new ProductImages object with default values
    const newProductImage: ProductImages = {
      id: imageId || '', // Extracted id from Cloudinary URL
      product_id: product_id, // Set product_id from props with a default value of ''
      imageURL: newImage,
      isPrimary: false, // Set default value for isPrimary
      createdBy: '', // Set default value or handle it in your API
      createdAt: null, // Set default value or handle it in your API
      updatedBy: '', // Set default value or handle it in your API
      updatedAt: null, // Set default value or handle it in your API
      company_id: '', // Set default value or handle it in your API
      branch_id: '', // Set default value or handle it in your API
    };

    form.setValue('imageURL', updatedImages);
    setImages([...images, newProductImage]);

    await form.trigger(); // Ensure all validation rules are checked

    await form.handleSubmit(onSubmit)(); // Submit the form
  };

  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl(imageURL);

      await axios.delete(`/api/inventory/productImages/${imageId}`);

      setImages((prevImages) =>
        prevImages.filter((image) => image.imageURL !== imageURL)
      );

      router.refresh();

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

      const imageId = extractPublicIdFromCloudinaryUrl(imageURL);

      const data = { isPrimary: newIsPrimary };

      await axios.patch(`/api/inventory/productImages/${imageId}`, data);

      const updatedImages = images.map((image) =>
        image.imageURL === imageURL
          ? { ...image, isPrimary: newIsPrimary }
          : { ...image, isPrimary: false }
      );

      setImages(updatedImages);

      setLoading(false);
      router.refresh();

      toast.success(
        newIsPrimary
          ? 'Image has been set as primary'
          : 'Image has been set as non-primary'
      );
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const orderedImages = [...images].sort((a, b) => (b.isPrimary ? 1 : -1));

  const onSubmit = async (data: ProductImageFormValues) => {
    // const onSubmit = async (data: { imageURL: { id: string; imageURL: string; product_id: string; isPrimary: boolean }[] }) => {

    try {
      setLoading(true);

      const dataToPost =
        typeof data.imageURL === 'string'
          ? [
              {
                id: extractPublicIdFromCloudinaryUrl(data.imageURL),
                imageURL: data.imageURL,
                product_id: product_id,
                isPrimary: true, // If it's a single image string, set isPrimary to true
              },
            ]
          : data.imageURL.map((imageURL, index, array) => ({
              id: extractPublicIdFromCloudinaryUrl(imageURL),
              imageURL,
              product_id: product_id,
              isPrimary: array.length === 1 ? true : false, // Set isPrimary based on array length
            }));

      await axios.post(`/api/inventory/productImages`, dataToPost);
      router.refresh();

      toast.success('New images have been added successfully.');
      setLoading(false);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
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
          <div className='w-full flex items-center justify-center'>
            <FormField
              control={form.control}
              name='imageURL'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <GalleryWithUpload
                      images={orderedImages.map((image) => ({
                        ...image,
                        isPrimary:
                          image.isPrimary === null ? false : image.isPrimary, // Assuming default is false if null
                      }))}
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

          <div className='w-full flex items-center justify-center gap-x-6'>
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
                const onClick = () => {
                  open();
                };

                return (
                  <Button
                    type='button'
                    disabled={product_id === 'new' || loading}
                    className={
                      product_id === 'new'
                        ? 'bg-secondary text-black'
                        : 'bg-primary text-white'
                    }
                    onClick={onClick}
                  >
                    <ImagePlus className='h-4 w-4 mr-2' />
                    Upload Image
                  </Button>
                );
              }}
            </CldUploadWidget>

            {/* {images && (
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
            )} */}
          </div>
        </form>
      </Form>
    </div>
  );
};

function extractPublicIdFromCloudinaryUrl(imageURL: string): string | null {
  const parts = imageURL.split('/');
  const fileName = parts.pop(); // Gets "myimage.jpg"
  if (typeof fileName === 'string') {
    const id = fileName.split('.')[0];
    return id; // Return the extracted id
  } else {
    console.error('fileName is not a string');
    return null; // Return null or handle the error as needed
  }
}

export default ProductImageForm;
