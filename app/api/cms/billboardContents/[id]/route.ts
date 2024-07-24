import { prisma } from '@/lib/client';
import { v2 as cloudinary } from 'cloudinary';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
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

    const billboardContent = await prisma.billboardContents.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!billboardContent) {
      return new NextResponse('content id is not found', { status: 404 });
    }

    const billboard = await prisma.billboards.findUnique({
      where: {
        id: billboardContent.billboard_id,
      },
      select: {
        isImage: true, // Add this line to select the isImage field
      },
    });

    if (!billboard) {
      return new NextResponse('billboard id is not found', { status: 404 });
    }

    const urlID = params.id;

    try {
      if (billboard.isImage) {
        const result = await cloudinary.uploader.destroy(urlID, {
          invalidate: true,
        });
        console.log('Cloudinary delete result:', result);
      } else {
        const result = await cloudinary.uploader.destroy(urlID, {
          resource_type: 'video',
          type: 'upload',
          invalidate: true,
        });
        console.log('Cloudinary delete result:', result);
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
    }
    await prisma.billboardContents.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Billboard content has been deleted' });
  } catch (error) {
    console.log('[BILLBOARD_CONTENT_DELETE]', error);
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

    const billboardContent = await prisma.billboardContents.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!billboardContent) {
      return new NextResponse('Billboar content not found', { status: 404 });
    }

    const body = await req.json();
    const { isPrimary } = body as { isPrimary: boolean };

    if (isPrimary) {
      await prisma.billboardContents.updateMany({
        where: {
          billboard_id: billboardContent.billboard_id,
          id: {
            not: params.id,
          },
        },
        data: {
          isPrimary: false,
        },
      });
    }

    await prisma.billboardContents.update({
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
    console.log('[BILLBOARD_URLS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
