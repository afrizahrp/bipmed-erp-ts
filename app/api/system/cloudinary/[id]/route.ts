import { v2 as cloudinary } from 'cloudinary';

import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';

cloudinary.config({
  cloud_name: 'biwebapp',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function checkImageExists(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.api.resource(publicId, { type: 'upload' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await currentUser();
    if (!session) return NextResponse.json({}, { status: 401 });

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Cloudinary image id not found', { status: 404 });
    }

    const imageId = 'upload/' + params.id;

    checkImageExists(imageId)
      .then((result) => {
        console.log('Image exists:');
        // Proceed to destroy the image
        return cloudinary.uploader.destroy(imageId, { invalidate: true });
      })
      .then((destroyResult) => {
        console.log('Image destroyed:', destroyResult);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.http_code === 404) {
          console.log('Image does not exist, no action needed');
        } else {
          console.log('An error occurred:', error.message);
        }
      });

    return NextResponse.json({ message: 'Product image deleted' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
