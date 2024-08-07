import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        slug: params.slug,
        type: '1',
        iStatus: true,
        iShowedStatus: true,
      },
      include: {
        images: true,
      },
    });
    const response = NextResponse.json(category);
    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3001'; // Default to localhost if not set
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin); // Allow requests from your frontend's origin
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    return response;
  } catch (e) {
    console.log(e);
    const errorResponse = NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
    errorResponse.headers.set(
      'Access-Control-Allow-Origin',
      'http://localhost:3001'
    ); // Allow requests from your frontend's origin
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return errorResponse;
  }
}
