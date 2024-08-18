'use server';

import { db } from '@/lib/db';

export const getRoles = async () => {
  const roles = await db.userRole.findMany();
  return roles;
};
