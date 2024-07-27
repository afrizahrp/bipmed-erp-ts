import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const product = await prisma.products.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      specs: true,
      descriptions: true,
    },
  });

  return NextResponse.json(product);
}
