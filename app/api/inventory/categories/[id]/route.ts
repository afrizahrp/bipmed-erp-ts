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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await request.json();
    const { id, name, remarks, imageURL, iStatus } = body as {
      id: string;
      name: string;
      remarks: string;
      imageURL: string;
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
    const editCategory = {
      id,
      name,
      iStatus,
      remarks,
      imageURL,
      updatedBy: username,
      updatedAt: new Date(),
    };

    const updatedCategories = await prisma.categories.update({
      where: { id: params.id },
      data: editCategory,
    });

    return NextResponse.json(updatedCategories);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to updating categories',
        result: e,
      },
      { status: 500 }
    );
  }
}
