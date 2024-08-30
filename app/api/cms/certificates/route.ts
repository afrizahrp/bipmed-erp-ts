import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iShowedStatus = searchParams.get('iShowedStatus');
    const name = searchParams.get('name');
    const certificate = await prisma.certificates.findMany({
      where: {
        iStatus: true,
        iShowedStatus: iShowedStatus === 'true' ? true : false,
        name: {
          contains: name?.toLowerCase(),
        },
      },
      include: {
        images: true,
        showStatus: true,
      },
    });
    const productsWithPrimaryImage = certificate.map((product) => {
      const primaryImages = product.images.filter((image) => image.isPrimary);
      const primaryImageURL =
        primaryImages.length > 0 ? primaryImages[0].imageURL : null;
      return {
        ...product,
        primaryImageURL,
      };
    });

    const response = NextResponse.json(productsWithPrimaryImage);

    // const allowedOrigin =
    //   'https://bipmed.vercel.app' || 'http://localhost:3001'; // Default to localhost if not set

    // const allowedOrigin =
    //   'https://bipmed.vercel.app' || 'http://localhost:3001'; // Default to localhost if not set

    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set

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

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this as needed
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
export async function POST(request: NextRequest) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

    const body = await request.json();
    const {
      provider_id,
      id,
      name,
      iStatus,
      iShowedStatus,
      remarks,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = body as {
      provider_id: number
      id: string;
      name: string;
      iStatus: boolean;
      iShowedStatus: boolean;
      remarks: string;
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };

    const userId = userName;


    const newCertificate = {
      provider_id,
      id,
      name,
      iStatus,
      iShowedStatus,
      remarks,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const certificate = await prisma.certificates.create({
      data: {
        ...newCertificate,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}