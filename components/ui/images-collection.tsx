'use client';

import Image from 'next/image';
import { useState } from 'react';

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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };
  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  return (
    <div>
      {/* Add border classes here */}
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {value.map((imageURL) => (
          <div
            key={imageURL}
            className='relative w-[300px] h-[300px] rounded-md justify-center items-center bg-gray-100 border border-gray-200       cursor-zoom-in'
            onClick={() => openZoomedImage(imageURL)}
          >
            <Image
              fill
              className='object-contain'
              objectPosition='center'
              alt='Image'
              src={imageURL}
              height={height}
              width={width}
            />
          </div>
        ))}
      </div>
      {zoomedImage && (
        <div className='zoomed-image-container' onClick={closeZoomedImage}>
          <Image
            src={zoomedImage}
            alt='zoomed-image'
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
    </div>
  );
};

export default ImageCollection;
