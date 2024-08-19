'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/client';
import { RegisterSchema } from '@/utils/schema/login.schema';
import { getUserByEmail, getUserByName } from '@/data/auth/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  const lang = 'en'; // This should be dynamically determined based on user selection

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await getUserByEmail(email);
  const existingName = await getUserByName(name);

  if (existingEmail) {
    return { error: 'Email already in use!' };
  }

  if (existingName) {
    return { error: 'Username already in use!' };
  }

  const defaultCompany = await prisma.companies.findFirst({
    where: {
      isDefault: true,
    },
  });

  const defaultBranch = await prisma.branches.findFirst({
    where: {
      isDefault: true,
    },
  });

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      company_id: defaultCompany?.id,
      branch_id: defaultBranch?.id,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    lang
  );

  return { success: 'Confirmation email sent!' };
};
