'use client';

import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { CategoryImages } from '@/types';
import GalleryTab from './gallery-tab';
import { FileImage } from 'lucide-react';

interface GalleryProps {
  images: CategoryImages[];
}
const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const imageExist = images.length;

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
        {imageExist > 0 ? (
          images.map((image) => (
            <Tab.Panel key={image.id}>
              <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
                {image.imageURL ? (
                  <NextImage
                    height={450}
                    width={450}
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
          ))
        ) : (
          <div className='text-center'>
            <FileImage className='w-32 h-32 text-slate-200' size='lg' />
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
