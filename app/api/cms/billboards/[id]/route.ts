import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const billboard = await prisma.billboards.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(billboard);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await currentUser();
    if (!session) return NextResponse.json({}, { status: 401 });

    const billboard = await prisma.billboards.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!billboard) {
      return new NextResponse('content id is not found', { status: 404 });
    }

    const publicIds = extractPublicIdFromCloudinaryUrl({
      url: billboard.contentURL,
    });

    await prisma.billboards.update({
      where: {
        id: params.id,
      },
      data: {
        contentURL: '',
        content_id: '',
      },
    });

    try {
      if (billboard.isImage) {
        const result = await cloudinary.uploader.destroy(publicIds, {
          invalidate: true,
        });
        console.log('Cloudinary delete result:', result);
      } else {
        const result = await cloudinary.uploader.destroy(publicIds, {
          resource_type: 'video',
          type: 'upload',
          invalidate: true,
        });
        console.log('Cloudinary delete result:', result);
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
    }

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
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const {
      description,
      section,
      title,
      isImage,
      contentURL,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      slug,
    } = body as {
      description: string;
      title: string;
      section: number;
      isImage: boolean;
      isShowBtn: boolean;
      btnText: string;
      contentURL: string;
      iStatus: boolean;
      iShowedStatus: boolean;
      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const editedBillboard = {
      description,
      section,
      title,
      isImage,
      contentURL,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,

      updatedBy: userName,
      updatedAt: new Date(),
    };

    const publicIds = extractPublicIdFromCloudinaryUrl({
      url: editedBillboard.contentURL,
    });

    const billboard = await prisma.billboards.update({
      where: {
        id: params.id,
      },
      data: {
        ...editedBillboard,
        content_id: publicIds,
        // contents: {
        //   createMany: {
        //     data: contents.map((content) => ({
        //       id: publicIds,
        //       contentURL: content.contentURL,
        //       isPrimary: true,
        //       createdBy: userName,
        //       createdAt: new Date(),
        //       updatedBy: userName,
        //       updatedAt: new Date(),
        //       company_id,
        //       branch_id,
        //     })),
        //   },
        // },
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

function extractPublicIdFromCloudinaryUrl(arg0: { url: string }): string {
  const { url } = arg0;
  const publicId = url.split('/').pop()?.split('.')[0];
  return publicId || '';
}
