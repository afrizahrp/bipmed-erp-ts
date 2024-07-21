import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productdesc = await prisma.productDescs.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(productdesc);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
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
