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
      id,
      section,
      title,
      description,
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
      id: string;
      section: number;
      title: string;
      description: string;
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
      section,
      title,
      description,
      isImage,
      isShowBtn,
      btnText,
      iStatus,
      iShowedStatus,
      contents: {
        createMany: {
          data: contents.map((content: { contentURL: string }) => ({
            id: publicIds,
            contentURL: content.contentURL,
            isPrimary: true,
            createdBy: userName,
            updatedBy: userName,
            createdAt: new Date(),
            updatedAt: new Date(),
            company_id: company_id,
            branch_id: branch_id,
          })),
        },
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
              isPrimary: true,
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
