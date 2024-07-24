import { prisma } from '@/lib/client';
import { BillboardListTable } from './billboard-list-table/components';
import { BillboardColumn } from './billboard-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Billboard List',
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
const BillboardListPage = async () => {
  const billboards = await prisma.billboards.findMany({
    include: {
      contents: true,
      status: true,
      showStatus: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedBillboard: BillboardColumn[] =
    billboards?.map((item) => ({
      id: item.id.toString(),
      name: item.name ?? '',
      section: item.section.toString() || '0',
      description: item.description ?? '',
      title: item.title ?? '',
      iStatus: item.iStatus as boolean,
      status: item.status.name || ('' as string),
      iShowedStatus: item.iShowedStatus as boolean,
      showStatus: item.showStatus.name || ('' as string),
      remarks: item.remarks ?? '',
      contents: item.contents.map((content) => content.contentURL),
      isImage: item.isImage as boolean,
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <BillboardListTable data={formattedBillboard} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BillboardListPage;
