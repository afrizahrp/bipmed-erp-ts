import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

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

    const { name, roleId } = body as {
      name: string;
      roleId: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('User id is not found', {
        status: 400,
      });
    }

    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        roleId,
      },
    });

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        roleId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
