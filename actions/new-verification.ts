'use server';

import { prisma } from '@/lib/client';
import { getUserByEmail, getUserByName } from '@/data/auth/user';
import { getVerificationTokenByToken } from '@/data/auth/verificiation-token';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    // Handle the error appropriately, e.g., return a response or throw a custom error
  }

  try {
    await prisma.user.delete({
      where: { id: existingToken.id },
    });
  } catch (error) {
    console.error('Error deleting token:', error);
    // Handle the error appropriately, e.g., return a response or throw a custom error
  }

  return { success: 'Email verified!' };
};
