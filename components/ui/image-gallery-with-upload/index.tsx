'use client';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import cn from '@/utils/class-names';

import NextImage from 'next/image';
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
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  product_id: string;
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
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  const imageExist = images.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  // const handleUpload = async (imageURL: string) => {
  //   try {
  //     setLoading(true);

  //     const { data } = await axios.post('/api/inventory/productImages', {
  //       isPrimary: false,
  //       imageURL,
  //     });

  //     onUpload(data);
  //     setLoading(false);
  //     toast.success('Image has been uploaded successfully.');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Something went wrong');
  //     setLoading(false);
  //   }
  // };

  const handleImageRemove = async (imageURL: string, id: string) => {
    try {
      setLoading(true);

      const cloudinaryImgId = extractPublicIdFromCloudinaryUrl({
        url: images.map((image) => image.imageURL),
      });

      await axios.delete(`/api/system/cloudinary/${cloudinaryImgId}`);
      await axios.delete(`/api/inventory/productImages/${id}`);

      onRemove(imageURL);
      setLoading(false);
      toast.success('Image has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <Tab.Group as='div' className='flex flex-col-reverse'>
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
          <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
            {images.map((image) => (
              <GalleryTabWithUpload key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className='aspect-square w-full'>
          {imageExist > 0 ? (
            images.map((image) => (
              <Tab.Panel key={image.id}>
                <div className='z-10 absolute top-1 right-1'>
                  <Button
                    type='button'
                    onClick={() => handleImageRemove(image.imageURL, image.id)}
                    color='destructive'
                    size='xs'
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>
                <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                  {image.imageURL ? (
                    <NextImage
                      height={500}
                      width={500}
                      src={image.imageURL}
                      alt='Image'
                      objectFit='cover'
                      className='object-cover object-center'
                    />
                  ) : (
                    <div>Image not available</div>
                  )}
                </div>
              </Tab.Panel>
            ))
          ) : (
            <div className='flex justify-center items-center h-full'>
              No images available
            </div>
          )}

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

                      // onClick={() =>
                      //   handleUpload(
                      //     product_id,
                      //     images.map((image) => image.imageURL).join(', ')
                      //   )
                      // }
                    >
                      {loading && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      <ImagePlus className='h-4 w-4 mr-2' />
                      Upload
                    </Button>

                    {/* <Button
                        type='button'
                        disabled={loading}
                        variant='outline'
                        onClick={() =>
                          handleUpload(images.map((image) => image.imageURL))
                        }
                      >
                        {loading && (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        Save
                      </Button> */}
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
