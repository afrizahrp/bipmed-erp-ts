import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

interface QueryResult {
  doc_id: string;
}

export async function GET(request: NextRequest) {
  try {
    const subcategories = await prisma.subCategories.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(subcategories);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

async function getSubCategoryId(
  companyId: string,
  branchId: string,
  categoryType: string,
  userId: string
): Promise<string> {
  try {
    const result: QueryResult[] =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_subCategoryId ${companyId}, ${branchId},  ${categoryType},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
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
    const username = session?.user?.name || '';

    const body = await request.json();
    const { category_id, name, remarks, iStatus } = body as {
      category_id: string;
      name: string;
      remarks: string;
      iStatus: boolean;
    };

    const userId = username; //session.user.id // Use the user ID from the session
    const subCategory_id = await getSubCategoryId(
      company_id,
      branch_id,
      category_id,
      userId
    );

    const newSubCategory = {
      type: '1',
      category_id: category_id,
      id: subCategory_id,
      name,
      remarks,
      iStatus,
      createdBy: username,
      updatedBy: username,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const subCategory = await prisma.subCategories.create({
      data: newSubCategory,
    });

    return NextResponse.json(subCategory, { status: 201 });
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
