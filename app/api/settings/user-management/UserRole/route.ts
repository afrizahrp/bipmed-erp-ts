import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userrole = await prisma.userRole.findMany({});

    return NextResponse.json(userrole);
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
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

    const body = await request.json();
    const { id, name, remarks, iStatus } = body as {
      id: string;
      name: string;
      remarks: string;
      iStatus: boolean;
    };

    const newUserRole = {
      id,
      name,
      remarks,
      iStatus,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const role = await prisma.userRole.create({
      data: newUserRole,
    });

    return NextResponse.json(role, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to create new role',
        result: e,
      },
      { status: 500 }
    );
  }
}
