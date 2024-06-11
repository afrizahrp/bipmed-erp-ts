'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button_T';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface ImageCollectionProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageCollection: React.FC<ImageCollectionProps> = ({
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
      {/* Add border classes here */}
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[300px] h-[300px] rounded-md'>
            <Image fill className='object-contain' alt='Image' src={url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollection;
