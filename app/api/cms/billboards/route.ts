import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const billboards = await prisma.billboards.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(billboards);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';

    const body = await request.json();
    const {
      name,
      description,
      title,
      section,
      isImage,
      isShowBtn,
      btnText,
      contents,
      isPrimary,
      iStatus,
      iShowedStatus,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = body as {
      name: string;
      description: string;
      section: number;
      title: string;
      isImage: boolean;
      isShowBtn: boolean;
      btnText: string;
      contents: { contentURL: string }[];
      isPrimary: false;

      iStatus: boolean;
      iShowedStatus: boolean;
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };

    const newBillboard = {
      name,
      description,
      section,
      title,
      isImage,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      isMaterial: false,
      contents: {
        deleteMany: {},
      },
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    let url = contents.map(
      (content: { contentURL: string }) => content.contentURL
    );
    const publicIds = extractPublicIdFromCloudinaryUrl({ url });

    const product = await prisma.billboards.create({
      data: {
        ...newBillboard,
        contents: {
          createMany: {
            data: contents.map((content: { contentURL: string }) => ({
              id: publicIds,
              contentURL: content.contentURL,
              isPrimary: false,
              createdBy: userName,
              updatedBy: userName,
              createdAt: new Date(),
              updatedAt: new Date(),
              company_id: company_id,
              branch_id: branch_id,
            })),
          },
        },
      },
      // newProduct: {
      //   images: {
      //     createMany: {
      //       newProduct: [...images.map((image: { imageURL: string }) => image)],
      //     },
      //   },
      // },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
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
