import { prisma } from '@/lib/client';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import { Card, CardContent } from '@/components/ui/card';

import { BillboardForm } from './components/billboard-form';
const BillboardPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const billboard = await prisma.billboards.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      contents: true,
    },
  });

  const pageHeader = {
    title: billboard ? 'Edit Billboard' : 'New Billboard',
    breadcrumb: [
      {
        name: 'List',
        href: routes.cms.billboards,
      },
      {
        name: billboard ? 'Edit Billboard' : 'New Billboard',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Card className='py-6'>
        <CardContent>
          <BillboardForm
            initialBillboardData={
              billboard ? { ...billboard, contents: [] } : null
            }
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BillboardPage;
