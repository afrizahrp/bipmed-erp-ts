import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const PoHeaders = await prisma.poHeader.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(PoHeaders);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
