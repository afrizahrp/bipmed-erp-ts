'use server';

// import { auth } from '@clerk/nextjs';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/client';
// import { createSafeAction } from '@/lib/create-safe-action';

import { UpdateProduct } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  //   const { userId, orgId } = auth();

  const session = await getServerSession(authOptions);
  const company_id = session?.user?.company_id || '';
  const branch_id = session?.user?.branch_id || '';
  const userName = session?.user?.name || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  if (!userName) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, ...values } = data;
  let card;

  try {
    card = await prisma.products.update({
      where: {
        id,
      },
      data: {
        ...values,
        updated_by: userName,
      },
    });
    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   action: ACTION.UPDATE,
    // });
  } catch (error) {
    return {
      error: 'Failed to update.',
    };
  }

  //   revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateProduct = UpdateProduct;
// createSafeAction(UpdateCard, handler);
