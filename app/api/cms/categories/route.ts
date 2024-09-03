import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      where: {
        type: '1',
        iStatus: true,
        iShowedStatus: true,
        // iShowedStatus: iShowedStatus === 'true' ? true : false,
      },
      include: {
        images: true,
        showStatus: true,
      },

      orderBy: {
        name: 'asc',
      },
    });
    const categoriesWithPrimaryImage = categories.map((category) => {
      const primaryImages = category.images.filter((image) => image.isPrimary);
      const primaryImageURL =
        primaryImages.length > 0 ? primaryImages[0].imageURL : null;
      return {
        ...category,
        primaryImageURL,
      };
    });

    const response = NextResponse.json(categoriesWithPrimaryImage);
    // const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set

    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set

    response.headers.set('Access-Control-Allow-Origin', allowedOrigin); // Allow requests from your frontend's origin
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    return response;
  } catch (e) {
    console.log(e);
    const errorResponse = NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
    errorResponse.headers.set(
      'Access-Control-Allow-Origin',
      'http://localhost:3001',
    ); // Allow requests from your frontend's origin
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return errorResponse;
  }
}
