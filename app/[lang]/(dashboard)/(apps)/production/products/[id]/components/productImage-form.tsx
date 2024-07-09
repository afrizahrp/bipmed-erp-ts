'use client';

import React, { useState } from 'react';
// import { Products, ProductImages } from '@prisma/client';
// import { ProductImages } from '@/types';

import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';

interface ProductImage {
  id: string;
  imageURL: string;
}

interface ProductImageFormProps {
  imageData: ProductImage[];
}

const ProductImageForm: React.FC<ProductImageFormProps> = ({ imageData }) => {
  // State to manage image URLs
  const [images, setImages] = useState(imageData);

  // Handler to add a new image URL
  const handleImageChange = (newImageUrl: string) => {
    const newImage = {
      id: Date.now().toString(), // Generate a pseudo-unique ID for the new image
      imageURL: newImageUrl,
    };
    setImages([...images, newImage]);
  };

  // Handler to remove an image URL
  const handleImageRemove = (imageUrlToRemove: string) => {
    setImages(images.filter((image) => image.imageURL !== imageUrlToRemove));
  };

  return (
    <>
      <div className='w-full flex flex-col gap-6 drop-shadow-md justify-center px-4'>
        <GalleryWithUpload
          images={images.map((image) => ({
            id: image.id,
            product_id: '', // Add the product_id property with an empty string value
            isPrimary: false, // Add the isPrimary property with a default value
            imageURL: image.imageURL,
          }))}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        />
        {/* <ImageUpload
          value={images.map((image) => image.imageURL)} // Pass image URLs to ImageUpload
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        /> */}
      </div>
    </>
  );
};

export default ProductImageForm;
