import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iShowedStatus = searchParams.get('iShowedStatus');
    const category_id = searchParams.get('category_id');
    const name = searchParams.get('name');
    const products = await prisma.products.findMany({
      where: {
        isMaterial: false,
        category_id: category_id || undefined,
        iStatus: true,
        iShowedStatus: iShowedStatus === 'true' ? true : false,
        name: {
          contains: name?.toLowerCase(),
        },
      },
      include: {
        images: true,
        descriptions: true,
        category: true,
        showStatus: true,
      },
    });
    const productsWithPrimaryImage = products.map((product) => {
      const primaryImages = product.images.filter((image) => image.isPrimary);
      const primaryImageURL =
        primaryImages.length > 0 ? primaryImages[0].imageURL : null;
      return {
        ...product,
        primaryImageURL,
      };
    });

    const response = NextResponse.json(productsWithPrimaryImage);
    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set



    response.headers.set('Access-Control-Allow-Origin', allowedOrigin); // Allow requests from your frontend's origin
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    return response;
  } catch (e) {
    console.log(e);
    const errorResponse = NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow requests from your frontend's origin
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return errorResponse;
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this as needed
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}