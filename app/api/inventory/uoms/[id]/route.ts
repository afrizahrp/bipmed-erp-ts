import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uom = await prisma.uoms.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(uom);
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
    const { id, name, remarks, iStatus } = body as {
      id: string;
      name: string;
      remarks: string;
      updatedBy: string;
      iStatus: boolean;
    };

    const categories = await prisma.categories.findUnique({
      where: { id: params.id },
    });
    if (!categories)
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      );
    const editUom = {
      id,
      name,
      iStatus,
      remarks,
      updatedBy: userName,
      updatedAt: new Date(),
    };

    const updatedUom = await prisma.uoms.update({
      where: { id: params.id },
      data: editUom,
    });

    return NextResponse.json(updatedUom);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to updating uom',
        result: e,
      },
      { status: 500 }
    );
  }
}
