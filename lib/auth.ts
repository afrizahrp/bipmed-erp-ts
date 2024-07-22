import type { NextAuthOptions, User } from 'next-auth';
import { prisma } from '@/lib/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'name',
          type: 'name',
          placeholder: 'name',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (passwordsMatch) {
          await prisma.user.update({
            where: { name: credentials.name },
            data: {
              isLoggedIn: true,
            },
          });
        }

        return passwordsMatch ? user : null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.isLoggedIn = token.isLoggedIn;
        session.user.avatar = token.avatar;
        session.user.company_id = token.company_id;
        session.user.branch_id = token.branch_id;
      }

      return session;
    },

    // extend session with custom data

    // async redirect({ url, baseUrl }) {
    //   const parsedUrl = new URL(url, baseUrl);
    //   if (parsedUrl.searchParams.has('callbackUrl')) {
    //     return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
    //   }
    //   if (parsedUrl.origin === baseUrl) {
    //     return url;
    //   }
    //   return baseUrl;
    // },
  },
};
