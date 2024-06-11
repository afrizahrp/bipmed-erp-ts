import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(products);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const username = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const {
      name,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      iStatus,
      remarks,
      images,
      tkdn_pctg,
      bmp_pctg,
      ecatalog_URL,
    } = body;

    // if (!session) {
    //   return new NextResponse('Unauthenticated', { status: 403 });
    // }

    if (!params.id) {
      return new NextResponse('Nama produk tidak boleh kosong', {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // if (!images || !images.length) {
    //   return new NextResponse('Images are required', { status: 400 });
    // }

    // if (!price) {
    //   return new NextResponse('Price is required', { status: 400 });
    // }

    // if (!categoryId) {
    //   return new NextResponse('Category id is required', { status: 400 });
    // }

    // if (!colorId) {
    //   return new NextResponse('Color id is required', { status: 400 });
    // }

    // if (!sizeId) {
    //   return new NextResponse('Size id is required', { status: 400 });
    // }

    await prisma.products.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        category_id,
        subCategory_id,
        brand_id,
        uom_id,
        images: {
          deleteMany: {},
        },
        iStatus,
        remarks,
        tkdn_pctg,
        bmp_pctg,
        ecatalog_URL,
        isMaterial: false,
        updatedBy: username,
        updatedAt: new Date(),
      },
    });

    const product = await prisma.products.update({
      where: {
        id: params.id,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { imageURL: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
