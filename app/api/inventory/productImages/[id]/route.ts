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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    // console.log('id from product Images api', params.id);

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const body = await req.json();

    const { imageURL, isPrimary } = body as {
      imageURL: string;
      isPrimary: boolean;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Product id is not found', {
        status: 400,
      });
    }

    // const editProductImage = await prisma.productImages.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });

    // console.log('id', params.id);

    // const productId = editProductImage?.product_id;

    // console.log('editProductImage', productId);

    // if (editProductImage?.isPrimary) {
    //   await prisma.productImages.updateMany({
    //     where: {
    //       product_id: productId, // Assuming each image is linked to a product via `productId`
    //     },
    //     data: {
    //       isPrimary: false,
    //     },
    //   });
    // }

    await prisma.productImages.update({
      where: {
        id: params.id,
      },
      data: {
        imageURL,
        isPrimary,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Product image has been updated' });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_PATCHED]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
