import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categories = await prisma.categories.findUnique({
      where: {
        id: params.id,
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const { type, name, iStatus, remarks, images, iShowedStatus, slug } =
      body as {
        type: string;
        name: string;
        iStatus: boolean;
        remarks: string;
        images: { imageURL: string }[];
        iShowedStatus: boolean;
        slug: string;
      };


    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Category id is not found', {
        status: 400,
      });
    }

    // if (!name) {
    //   return new NextResponse('Category name is required', { status: 400 });
    // }
    await prisma.categories.update({
      where: {
        id: params.id,
      },
      data: {
        type,
        name,
        images: {
          deleteMany: {},
        },
        iStatus,
        remarks,
        iShowedStatus,
        slug,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    const category = await prisma.categories.update({
      where: {
        id: params.id,
      },
      data: {
        images: {
          createMany: {
            data: images.map((image: { imageURL: string }) => ({
              imageURL: image.imageURL,
              isPrimary: false,
              updatedBy: userName,
              updatedAt: new Date(),
              company_id: company_id,
              branch_id: branch_id,
            })),
          },
        },
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
