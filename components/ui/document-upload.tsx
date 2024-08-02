'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { ArrowUpFromLine } from 'lucide-react';

interface DocumentUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
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
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[300px] h-[300px] rounded-md'>
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
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        options={{
          sources: ['local'],
          resourceType: 'auto',
          multiple: false,
          clientAllowedFormats: ['pdf'], // Allow only PDF files
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
              <ArrowUpFromLine className='h-4 w-4 mr-2' />
              Upload Document
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default DocumentUpload;