import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await currentUser();
    if (!session) return NextResponse.json({}, { status: 401 });

    const certificateImage = await prisma.certificateImages.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!certificateImage) {
      return new NextResponse('Certificate image not found', { status: 404 });
    }

    const imageId = params.id;

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

    await prisma.certificateImages.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Certificate image deleted' });
  } catch (error) {
    console.log('[CERTIFICATE_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const certificateImage = await prisma.certificateImages.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!certificateImage) {
      return new NextResponse('Product image not found', { status: 404 });
    }

    const body = await req.json();
    const { isPrimary } = body as { isPrimary: boolean };

    if (isPrimary) {
      // Set isPrimary to false for all other images of the same product
      await prisma.certificateImages.updateMany({
        where: {
          certificate_id: certificateImage.certificate_id,
          id: {
            not: params.id,
          },
        },
        data: {
          isPrimary: false,
        },
      });
    }

    await prisma.certificateImages.update({
      where: {
        id: params.id,
      },
      data: {
        isPrimary,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Certificate image has been updated' });
  } catch (error) {
    console.log('[CERTIFICATE_IMAGE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
