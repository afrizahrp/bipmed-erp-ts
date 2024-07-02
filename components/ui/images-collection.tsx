'use client';

import Image from 'next/image';

interface ImageCollectionProps {
  disabled?: boolean;
  value: string[];
  height?: number;
  width?: number;
}

const ImageCollection: React.FC<ImageCollectionProps> = ({
  disabled,
  value,
  height,
  width,
}) => {
  return (
    <div>
      {/* Add border classes here */}
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {value.map((imageURL) => (
          <div
            key={imageURL}
            className='relative w-[200px] h-[200px] rounded-md '
          >
            <Image
              fill
              className='object-contain'
              alt='Image'
              src={imageURL}
              height={height}
              width={width}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollection;
