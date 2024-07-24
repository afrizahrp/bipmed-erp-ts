import { prisma } from '@/lib/client';
import { v2 as cloudinary } from 'cloudinary';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
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

    const productImage = await prisma.productImages.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!productImage) {
      return new NextResponse('Product image not found', { status: 404 });
    }

    const imageId = params.id;

    // await cloudinary.uploader.destroy(imageId, { invalidate: true });

    try {
      const result = await cloudinary.uploader.destroy(imageId, {
        invalidate: true,
        resource_type: 'image',
        type: 'upload',
      });
      console.log('Cloudinary delete result:', result);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
    }

    await prisma.productImages.delete({
      where: {
        id: params.id,
      },
    });

    console.log('before Product image deleted');

    return NextResponse.json({ message: 'Product image deleted' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const productImage = await prisma.productImages.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!productImage) {
      return new NextResponse('Product image not found', { status: 404 });
    }

    const body = await req.json();
    const { isPrimary } = body as { isPrimary: boolean };

    if (isPrimary) {
      // Set isPrimary to false for all other images of the same product
      await prisma.productImages.updateMany({
        where: {
          product_id: productImage.product_id,
          id: {
            not: params.id,
          },
        },
        data: {
          isPrimary: false,
        },
      });
    }

    await prisma.productImages.update({
      where: {
        id: params.id,
      },
      data: {
        isPrimary,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Product image has been updated' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
