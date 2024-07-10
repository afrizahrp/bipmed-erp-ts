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

import { Products } from '@/types';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';
import { toast } from 'react-hot-toast';
import { FcPrevious } from 'react-icons/fc';

interface ProductImage {
  id: string;
  imageURL: string;
}

interface ProductImageFormProps {
  product_id: string;
  imageData: ProductImage[];
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({
  product_id,
  imageData,
}) => {
  // State to manage image URLs
  const [images, setImages] = useState(imageData);
  const [loading, setLoading] = useState(false);

  // Handler to add a new image URL
  const handleImageChange = (newImageUrl: string) => {
    const newImage = {
      id: Date.now().toString(), // Generate a pseudo-unique ID for the new image
      imageURL: newImageUrl,
    };
    setImages([...images, newImage]);
  };

  // Handler to remove an image URL
  const handleImageRemove = (imageUrlToRemove: string) => {
    setImages(images.filter((image) => image.imageURL !== imageUrlToRemove));
  };

  // const defaultValues = {
  //   ...imageData[0],
  //   id: '',
  //   product_id: product_id,
  //   imageURL: imageData[0]?.imageURL || '',
  //   isPrimary: false,
  // };

  const defaultValues: ProductImageFormValues = {
    ...imageData[0],
    id: '',
    product_id: product_id,
    imageURL: imageData[0]?.imageURL || '',
    isPrimary: false,
  };

  const form = useForm<ProductImageFormValues>({
    resolver: zodResolver(productImageFormSchema),
    defaultValues,
  });

  const actionMessage = 'New images has added successfully.';

  const onSubmit = async (data: ProductImageFormValues) => {
    try {
      console.log(data);
      setLoading(true);
      // await axios.post(`/api/inventory/productImages`, data);
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
                        images={images.map((image) => ({
                          id: image.id,
                          product_id: product_id, // Add the product_id property with an empty string value
                          isPrimary: false, // Add the isPrimary property with a default value
                          imageURL: image.imageURL,
                        }))}
                        product_id={product_id}
                        onChange={(imageURL) =>
                          field.onChange([...field.value, { imageURL }])
                        }
                        onRemove={handleImageRemove}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full flex items-center'>
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
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductImageForm;
