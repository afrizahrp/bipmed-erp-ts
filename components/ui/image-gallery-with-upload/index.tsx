'use client';
import axios from 'axios';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import GalleryTabWithUpload from './gallery-tab';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

// import { ProductImages } from '@/types';
interface GalleryWithUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: { imageURL: string; isPrimary: boolean }[];
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
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewPrimary, setIsNewPrimary] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  const handleUpdateMainImage = async (
    imageURL: string,
    newIsPrimary: boolean
  ) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl({
        url: [imageURL],
      });

      console.log('isPrimary', newIsPrimary);

      const data = {
        isPrimary: newIsPrimary,
      };

      const respons = await axios.patch(
        `/api/inventory/productImages/${imageId}`,
        data
      );

      {
        newIsPrimary
          ? toast.success('Image has been set as primary')
          : toast.success('Image has been set as Non primary');
      }
      setLoading(false);
      router.refresh();
      return respons.data;
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const handleImageRemove = async (imageURL: string) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl({
        url: [imageURL],
      });

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

  return (
    <>
      <Tab.Group as='div' className='flex flex-col-reverse'>
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
          <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
            {images.map(
              (
                image: { imageURL: string; isPrimary: boolean },
                index: number
              ) => (
                <GalleryTabWithUpload
                  key={index}
                  image={image.imageURL}
                  disabled={loading}
                />
              )
            )}
          </Tab.List>
        </div>
        <Tab.Panels className='aspect-square w-full'>
          {images.length > 0 ? (
            images.map(({ imageURL, isPrimary }) => (
              <Tab.Panel key={imageURL} className='aspect-square relative'>
                <div className='z-10 absolute bottom-0 left-0 bg-white w-full rounded'>
                  <Switch
                    id='mainImage'
                    name='isPrimary'
                    checked={isPrimary}
                    onCheckedChange={(newIsPrimary) => {
                      setIsNewPrimary(newIsPrimary);
                      handleUpdateMainImage(imageURL, newIsPrimary);
                    }}
                    className='peer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    disabled={loading}
                    style={{
                      backgroundColor: isPrimary ? 'green' : 'gray',
                    }}
                  />

                  <div className='text-center'>
                    <div className='z-10 absolute top-1 right-1'>
                      {isPrimary ? (
                        <Badge color='success'> As Primary Image</Badge>
                      ) : (
                        <Badge color='secondary'> As Non Primary Image</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className='z-10 absolute top-1 left-1'>
                  <Button
                    type='button'
                    onClick={() => handleImageRemove(imageURL)}
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
                  {imageURL ? (
                    <Image
                      height={100}
                      width={0}
                      // fill
                      src={imageURL}
                      alt='Image'
                      objectFit='cover'
                      className='object-cover object-center'
                      sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div>Image not availabless</div>
                  )}
                </div>
              </Tab.Panel>
            ))
          ) : (
            <div className='flex items-center justify-center w-full h-full'>
              <div className='text-center'>
                <div className='text-lg font-semibold flex items-center justify-center w-full h-full'>
                  No images available
                </div>
              </div>
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
