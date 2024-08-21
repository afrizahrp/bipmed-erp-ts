import { prisma } from '@/lib/client';
import { UserRoleListTable } from './role-list-table';
import { UserRoleColumns } from './role-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Role List',
  breadcrumb: [
    {
      name: 'Home',
      href: routes.settings.home,
    },

    {
      name: 'List',
    },
  ],
};

const UserRolePage = async () => {
  const roles = await prisma.userRole.findMany({
    include: {
      status: true,
      users: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedRoles: UserRoleColumns[] =
    roles?.map((item) => ({
      id: item.id,
      name: item.name,
      status: item?.status?.name,
      remarks: item?.remarks,
      // users: item.users?.map((user) => user.name),
      users: item.users?.map((user) => ({
        name: user.name,
        email: user.email,
        id: user.id,
      })),
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <UserRoleListTable data={formattedRoles} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserRolePage;
