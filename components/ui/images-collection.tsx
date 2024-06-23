'use client';

import Image from 'next/image';

// interface Image {
//   url: string;
//   alt: string;
// }

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
        {value.map((imageURL) => (
          <div
            key={imageURL}
            className='relative w-[300px] h-[300px] rounded-md'
          >
            <Image fill className='object-contain' alt='Image' src={imageURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollection;
