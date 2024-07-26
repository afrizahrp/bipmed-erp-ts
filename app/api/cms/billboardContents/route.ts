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
  // Ensure the request is a POST request
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const body = await request.json();
  const { paramsToSign } = body;

  if (!paramsToSign) {
    return NextResponse.json(
      { error: 'paramsToSign is required' },
      { status: 400 }
    );
  }

  // Ensure the API secret is defined
  if (!process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary API secret not configured' },
      { status: 500 }
    );
  }

  // Generate the signature
  const timestamp = Math.round(new Date().getTime() / 1000); // Current timestamp
  const signature = cloudinary.utils.api_sign_request(
    { ...paramsToSign, timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  // Return the signature, timestamp, and api_key
  return NextResponse.json({
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY, // Ensure this is set in your environment variables
  });
}
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const company_id = session?.user?.company_id || '';
//     const branch_id = session?.user?.branch_id || '';
//     const userName = session?.user?.name || '';

//     const body = await request.json();

//     // Check if body is an array and not empty
//     if (!Array.isArray(body) || body.length === 0) {
//       return NextResponse.json(
//         { error: 'Invalid input data' },
//         { status: 400 }
//       );
//     }

//     // Extract product_id from the first item (assuming all items share the same product_id)
//     const { product_id } = body[0];

//     // Ensure product_id is defined
//     if (!product_id) {
//       return NextResponse.json(
//         { error: 'product_id is required' },
//         { status: 400 }
//       );
//     }

//     // Delete all product images associated with the provided product_id
//     await prisma.productImages.deleteMany({
//       where: {
//         product_id,
//       },
//     });

//     // Prepare new product images data
//     const newProductImages = body.map((item: any) => ({
//       id: item.id,
//       product_id: item.product_id,
//       isPrimary: item.isPrimary,
//       imageURL: item.imageURL,
//       createdBy: userName,
//       createdAt: new Date(),
//       updatedBy: userName,
//       updatedAt: new Date(),
//       company_id,
//       branch_id,
//     }));

//     // Insert new product images data
//     const productImage = await prisma.productImages.createMany({
//       data: newProductImages,
//     });

//     return NextResponse.json(productImage, { status: 201 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }

// function extractPublicIdFromCloudinaryUrl(urls: string[]): string[] {
//   return urls.map((url) => {
//     const parts = url.split('/');
//     return parts[parts.length - 1].split('.')[0];
//   });
// }
