'use client';

import Image from 'next/image';

interface ImageCollectionProps {
  disabled?: boolean;
  value: string[];
}

const ImageCollection: React.FC<ImageCollectionProps> = ({
  disabled,
  value,
}) => {
  return (
    <div>
      {/* Add border classes here */}
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
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
