import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const billboard = await prisma.billboards.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(billboard);
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

    const {
      name,
      description,
      section,
      title,
      isImage,
      URLS,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      slug,
    } = body as {
      name: string;
      description: string;
      title: string;
      section: number;
      isImage: boolean;
      isShowBtn: boolean;
      btnText: string;
      URLS: { url: string }[];
      iStatus: boolean;
      iShowedStatus: boolean;
      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }


    const billboard = await prisma.billboards.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        name,
        description,
        section,
        title,
        isImage,
        isShowBtn,
        btnText,
        iStatus,
        iShowedStatus,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
