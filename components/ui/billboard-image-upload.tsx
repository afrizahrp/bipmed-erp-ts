'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface BillboardImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const BillboardImageUpload: React.FC<BillboardImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className='mb-4 flex w-full h-auto items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-full h-[300px] rounded-md'>
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='soft'
                color='destructive'
                size='sm'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              fill
              className='object-cover'
              alt='Image'
              src={url}
              // width='1200'
              // height='675'
            />
          </div>
        ))}
      </div>
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
            <Button
              type='button'
              disabled={disabled}
              variant='outline'
              onClick={onClick}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default BillboardImageUpload;
