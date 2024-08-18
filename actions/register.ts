'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail, getUserByName } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

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

  const defaultCompany = await db.companies.findFirst({
    where: {
      isDefault: true,
    },
  });

  const defaultBranch = await db.branches.findFirst({
    where: {
      isDefault: true,
    },
  });

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      company_id: defaultCompany?.id,
      branch_id: defaultBranch?.id,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
