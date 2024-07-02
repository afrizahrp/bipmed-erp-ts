'use client';

import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { ProductImages } from '@/types';
import GalleryTab from './gallery-tab';

interface GalleryProps {
  images: ProductImages[];
}
const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-2 gap-6'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
              {image.imageURL ? (
                <div className='border-2 border-gray-300'>
                  <NextImage
                    fill
                    src={image.imageURL} // Assuming imageURL is a valid string
                    alt='Image'
                    className='object-cover object-center'
                    objectPosition='center'
                  />
                </div>
              ) : (
                <div>Image not available</div> // Or any other fallback rendering
              )}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
