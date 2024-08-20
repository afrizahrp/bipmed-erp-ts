'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/client';
import { SettingsSchema } from '@/utils/schema/login.schema';
import { getUserByEmail, getUserById, getUserByName } from '@/data/auth/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  const lang = 'en'; // This should be dynamically determined based on user selection

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.name = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    if (values.name && values.name !== user.name) {
      const existingName = await getUserByName(values.name);

      if (existingName && existingName.id !== user.id) {
        return { error: 'Username already in use!' };
      }
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      lang
    );

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
      roles: undefined,
    },
  });

  // const roles = updatedUser.role.map((role as string) => role.toUpperCase());

  prisma.user.update({
    data: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      // role:
    },
    where: { id: dbUser.id },
  });

  return { success: 'Settings Updated!' };
};
