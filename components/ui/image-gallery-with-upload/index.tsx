'use client';
import axios from 'axios';

import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { ProductImages } from '@/types';
import GalleryTabWithUpload from './gallery-tab';
import cloudinary from 'cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { on } from 'events';

// import {
//   Magnifier,
//   GlassMagnifier,
//   SideBySideMagnifier,
//   PictureInPictureMagnifier,
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION,
// } from 'react-image-magnifiers';
interface GalleryWithUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: ProductImages[];
}

function extractPublicIdFromCloudinaryUrl(image: { url: string[] }) {
  // Assuming the URL is in the 'url' property of the 'image' object
  const lastPart = image.url[0].split('/').pop();

  const publicIdWithPossibleTransformations = lastPart
    ? lastPart.split('.')[0]
    : '';

  const publicId = publicIdWithPossibleTransformations.split(',').pop();

  return publicId;
}

const GalleryWithUpload: React.FC<GalleryWithUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  images,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  const handleImageRemove = async (imageURL: string, id: string) => {
    try {
      setLoading(true);

      const cloudinaryImageId = extractPublicIdFromCloudinaryUrl({
        url: images.map((image) => image.imageURL),
      });

      const response = await axios.delete(
        `/api/system/cloudinary/${cloudinaryImageId}`
      );
      console.log('response', response);

      await axios.delete(`/api/inventory/productImages/${id}`);

      onRemove(imageURL);
      toast.success('Image has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
        <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
          {images.map((image) => (
            <GalleryTabWithUpload key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className='z-10 absolute top-1 right-1'>
              <Button
                type='button'
                onClick={() => handleImageRemove(image.imageURL, image.id)}
                color='destructive'
                size='xs'
                disabled={loading}
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
              {image.imageURL ? (
                <NextImage
                  fill
                  src={image.imageURL}
                  alt='Image'
                  className='object-cover object-center'
                  objectPosition='center'
                />
              ) : (
                <div>Image not available</div>
              )}
            </div>
          </Tab.Panel>
        ))}

        <div className='py-3'>
          <CldUploadWidget
            onSuccess={onUpload}
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
                  disabled={loading}
                  variant='outline'
                  onClick={onClick}
                >
                  <ImagePlus className='h-4 w-4 mr-2' />
                  Upload Images
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        {/* End of Tab.Panel */}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GalleryWithUpload;
