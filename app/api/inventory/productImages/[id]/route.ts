import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    // console.log('id from product Images api', params.id);

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const productImage = await prisma.productImages.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!productImage) {
      return new NextResponse('Product image not found', { status: 404 });
    }

    await prisma.productImages.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Product image deleted' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
