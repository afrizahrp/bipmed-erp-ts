import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iShowedStatus = searchParams.get('iShowedStatus');

    const billboards = await prisma.billboards.findMany({
      where: {
        iShowedStatus: iShowedStatus === 'true' ? true : false,
      },
      orderBy: {
        section: 'asc',
      },
    });

    const response = NextResponse.json(billboards);
    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set

    response.headers.set('Access-Control-Allow-Origin', allowedOrigin); // Allow requests from your frontend's origin
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    return response;
  } catch (e) {
    console.log(e);
    const errorResponse = NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow requests from your frontend's origin
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return errorResponse
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';

    const body = await request.json();
    const {
      section,
      title,
      description,
      isImage,
      isShowBtn,
      btnText,
      contentURL,
      content_id,
      isPrimary,
      iStatus,
      iShowedStatus,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = body as {
      section: number;
      title: string;
      description: string;
      isImage: boolean;
      isShowBtn: boolean;
      btnText: string;
      contentURL: string;
      content_id: string;
      isPrimary: false;
      iStatus: boolean;
      iShowedStatus: boolean;
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };

    const newBillboard = {
      section,
      title,
      description,
      isImage,
      isShowBtn,
      btnText,
      content_id,
      iStatus,
      iShowedStatus,
      contentURL,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    // let url = contents.map(
    //   (content: { contentURL: string }) => content.contentURL
    // );
    const publicIds = extractPublicIdFromCloudinaryUrl({
      url: newBillboard.contentURL,
    });

    const product = await prisma.billboards.create({
      data: {
        ...newBillboard,
        content_id: publicIds,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

function extractPublicIdFromCloudinaryUrl(arg0: { url: string }): string {
  const { url } = arg0;
  const publicId = url.split('/').pop()?.split('.')[0];
  return publicId || '';
}
