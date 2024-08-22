import { prisma } from '@/lib/client';
import { UserListTable } from './user-list-table';
import { UserColumns } from './user-list-table/components/columns';
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

const UserPage = async () => {
  const user = await prisma.user.findMany({
    include: {
      roles: true,
    },
  });

  const formattedRoles: UserColumns[] =
    user?.map((item) => ({
      id: item.id,
      name: item.name,
      roleId: item?.roleId,
      roles: item.roles?.name,
    })) ?? [];
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <UserListTable data={formattedRoles} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserPage;
