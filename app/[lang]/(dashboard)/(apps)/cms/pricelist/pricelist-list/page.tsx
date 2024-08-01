import { prisma } from '@/lib/client';
import { PriceListTable } from './pricelist-list-table/components';
import { PriceListColumn } from './pricelist-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Price List',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'List',
    },
  ],
};
const PriceListPage = async () => {
  const pricelist = await prisma.priceList.findMany({
    include: {
      status: true,
      showStatus: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedPriceList: PriceListColumn[] =
    pricelist?.map((item) => ({
      id:item.id ?? '',
      name: item.name ?? '',
      iStatus: item.iStatus as boolean,
      status: item.status.name || ('' as string),
      iShowedStatus: item.iShowedStatus as boolean,
      showStatus: item.showStatus.name || ('' as string),
      remarks: item.remarks ?? '',
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <PriceListTable data={formattedPriceList} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PriceListPage;
