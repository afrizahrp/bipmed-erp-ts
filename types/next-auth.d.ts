import { DefaultSession } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

// import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      isLoggedIn?: boolean;
      accessToken: string;
      avatar: string;
      company_id: string;
      branch_id: string;
    } & DefaultSession['user'];
  }
}

interface User extends DefaultUser {
  id: string;
  role: string;
  isLoggedIn?: boolean;
  accessToken: string;
  avatar: string;
  company_id: string;
  branch_id: string;
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    isLoggedIn?: boolean;
    accessToken: string;
    avatar: string;
    company_id: string;
    branch_id: string;
  }
}
