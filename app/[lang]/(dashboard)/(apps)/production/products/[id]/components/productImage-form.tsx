'use client';

import { Products, ProductImages } from '@prisma/client';

import Gallery from '@/components/gallery/products';
import { CldUploadButton } from 'next-cloudinary';

interface ProductImage {
  id: string; // Assuming each image has an ID
  imageURL: string; // The URL of the image
}

interface ProducImageFormProps {
  imageData: ProductImage[];
}

export const ProducImageForm: React.FC<ProducImageFormProps> = ({
  imageData,
}) => {
  return (
    <>
      <div className='w-full flex flex-col gap-6 drop-shadow-md justify-center px-4'>
        <Gallery
          images={imageData.map((image) => ({
            id: image.id,
            imageURL: image.imageURL,
            product_id: '', // Add a placeholder value for product_id
            isPrimary: false, // Add a placeholder value for isPrimary
          }))}
        />
      </div>
      <div className='flex flex-col gap-6'>
        <CldUploadButton />
      </div>
    </>
  );
};
