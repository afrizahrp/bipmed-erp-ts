import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  roleId: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  company_id: string;
  branch_id: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
