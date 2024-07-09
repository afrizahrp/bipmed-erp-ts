'use client';

import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { ProductImages } from '@/types';
import GalleryTabWithUpload from './gallery-tab';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface GalleryWithUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: ProductImages[];
}
const GalleryWithUpload: React.FC<GalleryWithUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  images,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

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
                onClick={() => onRemove(image.imageURL)}
                color='destructive'
                size='xs'
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
                  disabled={disabled}
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
