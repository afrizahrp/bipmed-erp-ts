'use server';

import { currentRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await currentRole();

  // console.log("admin.ts: role:", role)

  if (role === 'ADMIN') {
    // if (role === UserRole.ADMIN) {

    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
