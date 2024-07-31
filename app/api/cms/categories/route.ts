import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
// import { authOptions } from '@/lib/auth';
// import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iShowedStatus = searchParams.get('iShowedStatus');
    const categories = await prisma.categories.findMany({
      where: {
        type: '1',
        iShowedStatus: iShowedStatus === 'true' ? true : false,
      },
      include: {
        images: true,
        showStatus: true,
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

    return NextResponse.json(categoriesWithPrimaryImage);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
