import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const getLocalizedDomain = (lang: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL + '/[lang]';
  return domain.replace('[lang]', lang);
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  lang: string
) => {
  const localizedDomain = getLocalizedDomain(lang);
  await resend.emails.send({
    from: 'afriza@bumiindah.co.id',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  lang: string
) => {
  const localizedDomain = getLocalizedDomain(lang);
  const resetLink = `${localizedDomain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'afriza@bumiindah.co.id',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  lang: string
) => {
  const localizedDomain = getLocalizedDomain(lang);
  const confirmLink = `${localizedDomain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'afriza@bumiindah.co.id',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
