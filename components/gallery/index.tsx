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
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none '>
        <Tab.List className='grid grid-cols-3 gap-6 flex items-center justify-center'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden flex items-center justify-center pt-28'>
              {image.imageURL ? (
                <NextImage
                  // fill
                  height={400}
                  width={400}
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
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;