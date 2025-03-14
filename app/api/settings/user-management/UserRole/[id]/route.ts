import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userrole = await prisma.userRole.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(userrole);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const { id, name, iStatus, remarks } = body as {
      id: string;
      name: string;
      iStatus: boolean;
      remarks: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Category id is not found', {
        status: 400,
      });
    }

    await prisma.userRole.update({
      where: {
        id: params.id,
      },
      data: {
        id,
        name,
        iStatus,
        remarks,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    const userrole = await prisma.userRole.update({
      where: {
        id: params.id,
      },
      data: {
        id,
        name,
        iStatus,
        remarks,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(userrole);
  } catch (error) {
    console.log('[USERROLE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
