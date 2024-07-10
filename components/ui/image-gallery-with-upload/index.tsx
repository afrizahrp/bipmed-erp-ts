'use client';
import axios from 'axios';

import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { ProductImages } from '@/types';
import GalleryTabWithUpload from './gallery-tab';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers';
interface GalleryWithUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: string[];
}

export function extractPublicIdFromCloudinaryUrl(image: { url: string[] }) {
  // Assuming the URL is in the 'url' property of the 'image' object
  const lastPart = image.url[0].split('/').pop();

  const publicIdWithPossibleTransformations = lastPart
    ? lastPart.split('.')[0]
    : '';

  const publicId = publicIdWithPossibleTransformations.split(',').pop();

  return publicId;
}

const GalleryWithUpload: React.FC<GalleryWithUploadProps> = ({
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

  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl({
        url: [imageURL],
      });

      // console.log(imageId);
      await axios.delete(`/api/system/cloudinary/${imageId}`);
      await axios.delete(`/api/inventory/productImages/${imageId}`);

      onRemove(imageURL);
      setLoading(false);
      toast.success('Image has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  // const imageExist = images.length;
  // console.log(images);
  return (
    <>
      <Tab.Group as='div' className='flex flex-col-reverse'>
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
          <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
            {images.map((image: string, index: number) => (
              <GalleryTabWithUpload
                key={index}
                image={image}
                disabled={loading}
              />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className='aspect-square w-full'>
          {/* {imageExist > 0 ? ( */}
          {images.map((imageURL) => (
            <Tab.Panel key={imageURL} className='aspect-square relative'>
              <div className='z-10 absolute top-1 left-1'>
                <Button
                  type='button'
                  onClick={() => handleImageRemove(imageURL)}
                  variant='soft'
                  color='destructive'
                  size='xs'
                  disabled={loading}
                >
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                {imageURL ? (
                  <Image
                    height={380}
                    width={380}
                    src={imageURL}
                    alt='Image'
                    objectFit='cover'
                    className='object-cover object-center'
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
                  <div>
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
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default GalleryWithUpload;
