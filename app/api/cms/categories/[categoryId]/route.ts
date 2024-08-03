import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        type: '1',
        id: params.categoryId,
        iStatus: true,
        iShowedStatus: true,
      },
      include: {
        images: true,
      },
    });
    const response = NextResponse.json(category);
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await request.json();
    const { title, descriptions, features, footers } = body as {
      title: string;
      descriptions: string;
      features: string;
      footers: string;
    };

    const productdescs = await prisma.productDescs.findUnique({
      where: { id: params.id },
    });
    if (!productdescs)
      return NextResponse.json(
        { error: 'Product Description not found' },
        { status: 404 }
      );
    const editProductDescs = {
      title,
      descriptions,
      features,
      footers,
      updatedBy: username,
      updatedAt: new Date(),
    };

    const updateProductDescs = await prisma.productDescs.update({
      where: { id: params.id },
      data: editProductDescs,
    });

    return NextResponse.json(updateProductDescs);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message:
          'Something went wrong while trying to updating product description',
        result: e,
      },
      { status: 500 }
    );
  }
}
