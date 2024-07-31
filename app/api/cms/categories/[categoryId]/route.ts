import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const product = await prisma.categories.findUnique({
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

  return NextResponse.json(product);
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
