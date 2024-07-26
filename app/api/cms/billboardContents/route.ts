import { prisma } from '@/lib/client';

import { v2 as cloudinary } from 'cloudinary';

// import cloudinary from 'cloudinary';

import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
// import getProductId from '../../system/getProductId/route';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';

    const body = await request.json();

    // Check if body is an array and not empty
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    // Extract product_id from the first item (assuming all items share the same product_id)
    const { billboard_id } = body[0];

    // Ensure billboard_id is defined
    if (!billboard_id) {
      return NextResponse.json(
        { error: 'billboard_id is required' },
        { status: 400 }
      );
    }

    // Delete all product images associated with the provided billboard_id
    await prisma.billboardContents.deleteMany({
      where: {
        billboard_id,
      },
    });

    // Prepare new product images data
    const newBillboardContent = body.map((item: any) => ({
      id: item.id,
      billboard_id: item.billboard_id,
      isPrimary: item.isPrimary,
      contentURL: item.contentURL,
      createdBy: userName,
      createdAt: new Date(),
      updatedBy: userName,
      updatedAt: new Date(),
      company_id,
      branch_id,
    }));

    // Insert new product images data
    const billboardContent = await prisma.billboardContents.createMany({
      data: newBillboardContent,
    });

    return NextResponse.json(billboardContent, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
