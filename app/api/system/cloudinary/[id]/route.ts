import { v2 as cloudinary } from 'cloudinary';

import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

cloudinary.config({
  cloud_name: 'biwebapp',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Cloudinary image id not found', { status: 404 });
    }

    // console.log('id from cloudinary api', params.id);

    // const deleteImage = cloudinary.uploader
    //   .destroy(params.id, {
    //     invalidate: true,
    //     type: 'authenticated',
    //   })
    //   .then((result) => console.log(result));

    const result = await cloudinary.uploader.destroy(params.id);

    if (result.result !== 'ok') {
      console.error('Failed to delete image:', result);
      return new NextResponse('Deletion failed', { status: 500 });
    }

    // await cloudinary.uploader.destroy(params.id);
    // if (!deleteImage) {
    //   return new NextResponse('Deleting image failed', { status: 404 });
    // }

    return NextResponse.json({ message: 'Product image deleted' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
