'use client';
import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import GalleryTabWithUpload from './gallery-tab';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

import { Badge } from '@/components/ui/badge';

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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };
  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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

                <div className='w-full bg-white'>
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
                    {image.isPrimary && (
                      <Badge color='success' className='text-xs'>
                        Primary
                      </Badge>
                    )}
                  </div>
                </div>
                {/* <div className='z-10 flex bottom-0 justify-end items-center text-xs'>
                  {image.isPrimary ? (
                    <Badge color='success'>Has been set as Primary</Badge>
                  ) : (
                    <Badge color='secondary'>Has Not been set as Primary</Badge>
                  )}
                </div> */}

                <div
                  className='aspect-square relative h-full w-full justify-center items-center sm:rounded-lg overflow-hidden
                  cursor-zoom-in'
                  onClick={() => openZoomedImage(image.imageURL)}
                >
                  <NextImage
                    priority
                    height={100}
                    width={100}
                    src={image.imageURL}
                    alt='Image'
                    className='object-center'
                    sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                    style={{ width: '90%', height: '100%' }}
                  />
                </div>
                {zoomedImage && (
                  <div
                    className='zoomed-image-container'
                    onClick={closeZoomedImage}
                  >
                    <NextImage
                      src={zoomedImage}
                      alt='zoomed-image'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                )}
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
