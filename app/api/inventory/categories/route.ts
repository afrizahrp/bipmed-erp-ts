import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

interface QueryResult {
  doc_id: string;
}

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      where: { slug: { not: 'noname' } },
      orderBy: {
        updatedAt: 'desc',
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

async function getCategoryId(
  companyId: string,
  branchId: string,
  categoryType: string,
  userId: string
): Promise<string> {
  try {
    const result: QueryResult[] =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_CategoryId ${companyId}, ${branchId},  ${categoryType},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
    // console.log('new category id is:', docId);
    return docId;
  } catch (e) {
    console.error(e);

    throw new Error('Something went wrong while trying to get document ID');
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
      type,
      name,
      remarks,
      iStatus,
      imageURL,
      images,
      iShowedStatus,
      slug,
      href,
      icon,
    } = body as {
      type: string;
      name: string;
      remarks: string;
      iStatus: boolean;
      imageURL: string;
      images: { imageURL: string }[];
      iShowedStatus: boolean;
      slug: string;
      href: string;
      icon: string;
    };

    const categoryType = type;
    const userId = userName; //session.user.id // Use the user ID from the session
    const categoryId = await getCategoryId(
      company_id,
      branch_id,
      categoryType,
      userId
    );

    const newCategory = {
      type,
      name,
      id: categoryId,
      remarks,
      imageURL,
      iStatus,
      iShowedStatus,
      slug,
      href,
      icon,
      images: {
        deleteMany: {},
      },
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };



    const category = await prisma.categories.create({
      data: {
        ...newCategory,
        images: {
          createMany: {
            data: images.map((image: { imageURL: string }) => ({
              imageURL: image.imageURL,
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
    });




    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to create new category',
        result: e,
      },
      { status: 500 }
    );
  }
}
