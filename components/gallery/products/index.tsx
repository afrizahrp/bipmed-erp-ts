'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { ProductImages } from '@/types';
import GalleryTab from './gallery-tab';
import { FileImage } from 'lucide-react';

interface GalleryProps {
  images: ProductImages[];
}
const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };
  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
        <Tab.List className='grid grid-cols-4 gap-6 flex items-center justify-center'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.length > 0 ? (
          images.map((image) => (
            <Tab.Panel key={image.id}>
              <div
                className='aspect-square relative h-full w-full justify-center items-center sm:rounded-lg overflow-hidden
                  cursor-zoom-in'
                onClick={() => openZoomedImage(image.imageURL)}
              >
                {image.imageURL ? (
                  <NextImage
                    height={450}
                    width={450}
                    src={image.imageURL}
                    alt='Image'
                    className='object-contain'
                    objectPosition='center'
                    sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                  />
                ) : (
                  // <div>Image not available</div>
                  <div className='text-lg font-semibold flex items-center justify-center w-full h-full'>
                    No images available
                  </div>
                )}
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
          <div className='text-center'>
            <FileImage className='w-32 h-32 text-slate-200' size='32' />
            <div className='text-slate-400 text-sm mt-2'>
              No image available
            </div>
          </div>
        )}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
