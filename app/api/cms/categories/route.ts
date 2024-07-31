import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
// import { authOptions } from '@/lib/auth';
// import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iShowedStatus = searchParams.get('iShowedStatus');
    const products = await prisma.products.findMany({
      where: {
        isMaterial: false,
        iShowedStatus: iShowedStatus === 'true' ? true : false,
      },
      include: {
        images: true,
        descriptions: true,
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

    return NextResponse.json(productsWithPrimaryImage);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
