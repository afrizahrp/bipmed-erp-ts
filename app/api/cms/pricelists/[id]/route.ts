import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET({ params }: { params: { id: string } }) {
  try {
    const pricelist = await prisma.priceList.findUnique({
      where: {
        id: params.id,
      },
    });

    const response = NextResponse.json(pricelist);
    const allowedOrigin =
      'https://bipmed.vercel.app' || 'http://localhost:3001'; // Default to localhost if not set

    response.headers.set('Access-Control-Allow-Origin', allowedOrigin); // Allow requests from your frontend's origin
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    return response;
  } catch (e) {
    console.log(e);
    const errorResponse = NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
    errorResponse.headers.set(
      'Access-Control-Allow-Origin',
      'http://localhost:3001'
    ); // Allow requests from your frontend's origin
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return errorResponse;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const pricelist = await prisma.priceList.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!pricelist) {
      return new NextResponse('pricelist id is not found', { status: 404 });
    }

    const publicIds = extractPublicIdFromCloudinaryUrl({
      url: pricelist.fileURL,
    });

    await prisma.priceList.update({
      where: {
        id: params.id,
      },
      data: {
        fileURL: '',
      },
    });

    try {
      const result = await cloudinary.uploader.destroy(publicIds, {
        invalidate: true,
      });
      console.log('Cloudinary delete result:', result);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
    }

    return NextResponse.json({ message: 'Billboard content has been deleted' });
  } catch (error) {
    console.log('[PRICELIST_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const { name, fileURL, remarks, iStatus, iShowedStatus, slug } = body as {
      name: string;
      fileURL: string;
      remarks: string;
      iStatus: boolean;
      iShowedStatus: boolean;
      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const editedPricelist = {
      name,
      fileURL,
      remarks,
      iStatus,
      iShowedStatus,

      updatedBy: userName,
      updatedAt: new Date(),
    };

    const publicIds = extractPublicIdFromCloudinaryUrl({
      url: editedPricelist.fileURL,
    });

    const pricelist = await prisma.priceList.update({
      where: {
        id: params.id,
      },
      data: {
        ...editedPricelist,
        id: publicIds,
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

    return NextResponse.json(pricelist);
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
