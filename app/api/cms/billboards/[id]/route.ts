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
      id: params.id
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
      description,
      section,
      title,
      isImage,
      contents,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      slug,
    } = body as {
      description: string;
      title: string;
      section: number;
      isImage: boolean;
      isShowBtn: boolean;
      btnText: string;
      contents: { contentURL: string }[];
      iStatus: boolean;
      iShowedStatus: boolean;
      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const editedBillboard = {
      description,
      section,
      title,
      isImage,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      // contents: {
      //   deleteMany: {},
      // },
      updatedBy: userName,
      updatedAt: new Date(),
    };

    let url = contents.map(
      (content: { contentURL: string }) => content.contentURL
    );
    const publicIds = extractPublicIdFromCloudinaryUrl({ url });

    const billboard = await prisma.billboards.update({
      where: {
        id: params.id
      },
      data: {
        ...editedBillboard,
        // contents: {
        //   createMany: {
        //     data: contents.map((content) => ({
        //       id: publicIds,
        //       contentURL: content.contentURL,
        //       isPrimary: true,
        //       createdBy: userName,
        //       createdAt: new Date(),
        //       updatedBy: userName,
        //       updatedAt: new Date(),
        //       company_id,
        //       branch_id,
        //     })),
        //   },
        // },
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

function extractPublicIdFromCloudinaryUrl(arg0: { url: string[] }): string {
  const { url } = arg0;
  const publicIds: string[] = [];

  url.forEach((contentURL) => {
    const publicId = contentURL.split('/').pop()?.split('.')[0];
    if (publicId) {
      publicIds.push(publicId);
    }
  });

  return publicIds.join(',');
}
