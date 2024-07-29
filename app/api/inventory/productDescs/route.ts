import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const productdescs = await prisma.productDescs.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(productdescs);
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

    const { id, descriptions, benefit } = body as {
      id: string;
      descriptions: string;
      benefit: string;
    };

    const newproductdesc = {
      id,
      descriptions,
      benefit,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const productdesc = await prisma.productDescs.create({
      data: newproductdesc,
    });

    return NextResponse.json(productdesc, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message:
          'Something went wrong while trying to create new product description',
        result: e,
      },
      { status: 500 }
    );
  }
}
