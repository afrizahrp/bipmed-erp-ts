import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const productImage = await prisma.productImages.findMany({
      orderBy: {
        isPrimary: 'desc',
      },
    });

    return NextResponse.json(productImage);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

    const body = await request.json();

    // Check if body is an array and not empty
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 },
      );
    }

    // Extract product_id from the first item (assuming all items share the same product_id)
    const { product_id } = body[0];

    // Ensure product_id is defined
    if (!product_id) {
      return NextResponse.json(
        { error: 'product_id is required' },
        { status: 400 },
      );
    }

    // Delete all product images associated with the provided product_id
    await prisma.productImages.deleteMany({
      where: {
        product_id,
      },
    });

    // Prepare new product images data
    const newProductImages = body.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      isPrimary: item.isPrimary,
      imageURL: item.imageURL,
      createdBy: userName,
      createdAt: new Date(),
      updatedBy: userName,
      updatedAt: new Date(),
      company_id,
      branch_id,
    }));

    // Insert new product images data
    const productImage = await prisma.productImages.createMany({
      data: newProductImages,
    });

    return NextResponse.json(productImage, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
