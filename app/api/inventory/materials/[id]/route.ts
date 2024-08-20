import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();

    const {
      name,
      registered_id,
      catalog_id,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      iStatus,
      isMaterial,
      remarks,
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
      isMaterial: boolean;
      remarks: string;
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
      return new NextResponse('Material id is not found', {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse('Material name is required', { status: 400 });
    }

    const material = await prisma.products.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!material)
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );

    const editMaterial = {
      name,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      iStatus,
      remarks,
      registered_id,
      catalog_id,
      tkdn_pctg,
      bmp_pctg,
      ecatalog_URL,
      iShowedStatus,
      slug,
      isMaterial: true,
      updatedBy: userName,
      updatedAt: new Date(),
    };

    const updateMaterial = await prisma.products.update({
      where: {
        id: params.id,
      },
      data: editMaterial,
    });

    return NextResponse.json(updateMaterial);
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
