'use client';
import axios from 'axios';
import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import GalleryTabWithUpload from './gallery-tab';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
// import { useRouter } from 'next/navigation';

interface Image {
  imageURL: string;
  isPrimary: boolean;
}

interface GalleryWithUploadProps {
  onChange: (images: Image[]) => void;
  onRemove: (url: string) => void;
  onUpdatePrimary: (url: string, primaryStatus: boolean) => void;
  images: Image[];
}

export function extractPublicIdFromCloudinaryUrl(image: { url: string }) {
  const lastPart = image.url.split('/').pop();
  const publicIdWithPossibleTransformations = lastPart
    ? lastPart.split('.')[0]
    : '';
  const publicId = publicIdWithPossibleTransformations.split(',').pop();
  return publicId;
}

const GalleryWithUpload: React.FC<GalleryWithUploadProps> = ({
  onRemove,
  onUpdatePrimary,
  images,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // const handleImageRemove = async (imageURL: string) => {
  //   try {
  //     setLoading(true);
  //     const imageId = extractPublicIdFromCloudinaryUrl({ url: imageURL });
  //     await axios.delete(`/api/system/cloudinary/${imageId}`);
  //     await axios.delete(`/api/inventory/productImages/${imageId}`);
  //     onRemove(imageURL);
  //     setLoading(false);
  //     toast.success('Image has been removed successfully.');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Something went wrong');
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Tab.Group as='div' className='flex flex-col-reverse'>
        <div className='mx-auto mt-6 hidden h-full w-full max-w-2xl sm:block lg:max-w-none justify-center items-center '>
          <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
            {images.map((image) => (
              <GalleryTabWithUpload
                key={image.imageURL}
                image={image.imageURL}
              />
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className='aspect-square w-full'>
          {images.length > 0 ? (
            images.map((image) => (
              <Tab.Panel
                key={image.imageURL}
                className='aspect-square relative'
              >
                <div className='z-10 flex absolute top-0 left-1'>
                  <Button
                    type='button'
                    onClick={() => onRemove(image.imageURL)}
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
                    checked={image.isPrimary}
                    disabled={loading}
                    onCheckedChange={() =>
                      onUpdatePrimary(image.imageURL, !image.isPrimary)
                    }
                    style={{
                      backgroundColor: image.isPrimary ? 'green' : 'gray',
                    }}
                  />
                </div>

                <div className='aspect-square relative h-full w-full justify-center items-center sm:rounded-lg overflow-hidden'>
                  <NextImage
                    priority
                    height={1000}
                    width={0}
                    src={image.imageURL}
                    alt='Image'
                    className='object-center'
                    sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                    style={{ width: '80%', height: '100%' }}
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
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default GalleryWithUpload;
