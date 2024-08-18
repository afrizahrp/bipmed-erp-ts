'use client';

import { UserRole } from '@prisma/client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '@/components/form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const roleId = useCurrentRole();


  // if (roleId !== allowedRole.id) {
  // if (roleId !== 'ADMIN') {
  if (allowedRole.id !== 'ADMIN') {
    return (
      <FormError message='You do not have permission to view this content!ss' />
    );
  }

  return <>{children}</>;
};
