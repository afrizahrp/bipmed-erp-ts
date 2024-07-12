import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
// import getProductId from '../../system/getProductId/route';

export async function GET(request: NextRequest) {
  try {
    const productImage = await prisma.productImages.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(productImage);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('tambah product image');

    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';

    const body = await request.json();
    const {
      id,
      product_id,
      isPrimary,
      imageURL,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = body as {
      id: string;
      product_id: string;
      isPrimary: boolean;
      imageURL: string;
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };

    const newProductImages = {
      id,
      product_id,
      isPrimary,
      imageURL,
      createdBy: userName,
      createdAt: new Date(),
      updatedBy: userName,
      updatedAt: new Date(),
      company_id,
      branch_id,
    };

    const productImage = await prisma.productImages.createMany({
      data: newProductImages,
    });

    return NextResponse.json(productImage, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
