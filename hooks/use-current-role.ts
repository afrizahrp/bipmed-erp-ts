import { useSession } from 'next-auth/react';

export const useCurrentRole = () => {
  const session = useSession();

console.log('useCurrentRole:', session);

  return session.data?.user?.roleId
};
