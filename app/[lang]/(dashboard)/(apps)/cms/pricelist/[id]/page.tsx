import { prisma } from '@/lib/client';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import { Card, CardContent } from '@/components/ui/card';

import { PriceListForm } from './components/pricelist-form';
const PriceListPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const pricelist = await prisma.priceList.findUnique({
    where: {
      id: params.id,
    },
    include: {
      status: true,
      showStatus: true,
    },
  });

  const pageHeader = {
    title: pricelist ? 'Edit Pricelist' : 'New Pricelist',
    breadcrumb: [
      {
        name: 'List',
        href: routes.cms.pricelist,
      },
      {
        name: pricelist ? 'Edit Pricelist' : 'New Pricelist',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Card className='py-6'>
        <CardContent>
          <PriceListForm initialPriceListData={pricelist} />
        </CardContent>
      </Card>
    </>
  );
};

export default PriceListPage;
