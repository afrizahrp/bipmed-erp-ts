import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productSpec = await prisma.productSpecs.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(productSpec);
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
    const { construction, base, material, bodyFrame, cover, mattress } =
      body as {
        construction: string;
        base: string;
        material: string;
        bodyFrame: string;
        cover: string;
        mattress: string;
      };

    const productSpec = await prisma.productSpecs.findUnique({
      where: { id: params.id },
    });
    if (!productSpec)
      return NextResponse.json(
        { error: 'Specification not found' },
        { status: 404 }
      );
    const editProductSpec = {
      construction,
      base,
      material,
      bodyFrame,
      cover,
      mattress,
      updatedBy: username,
      updatedAt: new Date(),
    };

    const updatedProductSpec = await prisma.productSpecs.update({
      where: { id: params.id },
      data: editProductSpec,
    });

    return NextResponse.json(updatedProductSpec);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message:
          'Something went wrong while trying to updating product specification',
        result: e,
      },
      { status: 500 }
    );
  }
}
