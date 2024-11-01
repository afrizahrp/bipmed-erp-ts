'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { db } from '@/lib/db';
import { signIn } from '@/auth';
import { LoginSchema } from '@/utils/schema/login.schema';
import { getUserByName } from '@/data/auth/user';
import { getTwoFactorTokenByEmail } from '@/data/auth/two-factor-token';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { getTwoFactorConfirmationByUserId } from '@/data/auth/two-factor-confirmation';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  const lang = 'en'; // This should be dynamically determined based on user selection

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, password, code } = validatedFields.data;

  const existingUser = await getUserByName(name.trim().toLocaleLowerCase());
  // const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      lang
    );

    return { success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid code!' };
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
        lang
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      name,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
