import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.vProductCategories.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
