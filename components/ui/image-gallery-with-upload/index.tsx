'use client';
import axios from 'axios';
import NextImage from 'next/image';
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
import { ProductImages } from '@/types';

// import { ProductImages } from '@/types';
interface GalleryWithUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  onUpdatePrimary: (value: string, primaryStatus: boolean) => void;
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
  onUpdatePrimary,
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
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none justify-center items-center '>
          <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
            {images.map((image) => (
              <GalleryTabWithUpload key={image} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className='aspect-square w-full'>
          {images.length > 0 ? (
            images.map((imageURL) => (
              <Tab.Panel key={imageURL} className='aspect-square relative'>
                <div className='z-10 absolute top-0 left-1'>
                  <Button
                    type='button'
                    onClick={() => onRemove(imageURL)}
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

                <div className='z-10 absolute bottom-0 left-1'>
                  <Switch
                    checked={isNewPrimary}
                    // @ts-ignore

                    disabled={loading}
                    onCheckedChange={() =>
                      onUpdatePrimary(imageURL, isNewPrimary)
                    }
                    style={{
                      backgroundColor: isNewPrimary ? 'green' : 'gray',
                    }}
                  />
                </div>
                <div className='flex aspect-square relative h-full w-full justify-center items-center sm:rounded-lg overflow-hidden'>
                  <NextImage
                    priority
                    height={700}
                    width={0}
                    src={imageURL}
                    alt='Image'
                    className='object-center'
                    sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                    style={{ width: '85%', height: '100%' }}
                  />
                </div>
              </Tab.Panel>
            ))
          ) : (
            <div className='flex items-center justify-center w-full h-full'>
              <div className='text-lg font-semibold flex items-center justify-center w-full h-full'>
                No images available
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
