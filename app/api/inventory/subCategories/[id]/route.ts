import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subcategory = await prisma.subCategories.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(subcategory);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await currentUser();
  const company_id = session?.company_id || '';
  const branch_id = session?.branch_id || '';
  const userName = session?.name || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await request.json();
    const { id, type, name, remarks, iStatus } = body as {
      id: string;
      type: string;
      name: string;
      remarks: string;
      updatedBy: string;
      iStatus: boolean;
    };

    const subcategory = await prisma.subCategories.findUnique({
      where: { id: params.id },
    });
    if (!subcategory)
      return NextResponse.json(
        { error: 'Subkategori tidak ditemukan' },
        { status: 404 }
      );
    const editCategory = {
      id,
      type,
      name,
      iStatus,
      remarks,
      updatedBy: userName,
      updatedAt: new Date(),
    };

    const updatedSubCategories = await prisma.subCategories.update({
      where: { id: params.id },
      data: editCategory,
    });

    return NextResponse.json(updatedSubCategories);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to updating subcategories',
        result: e,
      },
      { status: 500 }
    );
  }
}
