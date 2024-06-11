import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

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
      registered_id,
      catalog_id,
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
      iShowedStatus,
      slug,
    } = body as {
      name: string;
      registered_id: string;
      catalog_id: string;
      category_id: string;
      subCategory_id: string;
      brand_id: string;
      uom_id: string;
      iStatus: boolean;
      remarks: string;
      images: { imageURL: string }[];
      tkdn_pctg: number;
      bmp_pctg: number;
      ecatalog_URL: string;
      iShowedStatus: boolean;

      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Product id is not found', {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse('Product name is required', { status: 400 });
    }
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
        registered_id,
        catalog_id,
        tkdn_pctg,
        bmp_pctg,
        ecatalog_URL,
        iShowedStatus,
        slug,
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
