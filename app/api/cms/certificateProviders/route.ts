import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const certificateProvider = await prisma.certificateProviders.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(certificateProvider);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
