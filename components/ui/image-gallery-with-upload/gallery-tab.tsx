import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { ProductImages } from '@/types';

interface GalleryTabWithUploadProps {
  image: string;
  disabled?: boolean;
}

const GalleryTabWithUpload: React.FC<GalleryTabWithUploadProps> = ({
  image,
  disabled,
}) => {
  return (
    <Tab
      className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'
      disabled={disabled}
    >
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <NextImage
              fill
              priority
              src={image}
              alt='images'
              sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'

              // className='object-cover object-center'
              // objectPosition='center'
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent'
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTabWithUpload;
