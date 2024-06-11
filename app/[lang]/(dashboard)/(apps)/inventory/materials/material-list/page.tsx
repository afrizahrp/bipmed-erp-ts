import { prisma } from '@/lib/client';
import { MaterialListTable } from './material-list-table/components';
import { MaterialColumn } from './material-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card_T';

import PageHeader from '@/app/shared/page-header';

import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Raw Material',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Inventory',

      href: routes.eCommerce.dashboard,
    },
    {
      name: 'List',
    },
  ],
};

const MaterialListPage = async () => {
  const materials = await prisma.products.findMany({
    where: {
      isMaterial: true,
    },
    include: {
      status: true,
      //   brand: true,
      //   category: true,
      //   subCategory: true,
      //    uom: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedProducts: MaterialColumn[] =
    materials?.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      // catalog: item.catalog_id ?? '',
      // category: item.category?.name,
      // subcategory: item.subCategory?.name,
      // brand: item.brand?.name,
      status: item.status?.name,
      // uom: item.uom ? item.uom.name : '', // Check if uom is not null before accessing name
      remarks: item.remarks,
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className='mt-4 flex items-center gap-3 @lg:mt-0'>
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
        </div>
      </PageHeader>
      <Card className='mt-6'>
        <CardContent className='p-10'>
          <MaterialListTable data={formattedProducts} />
        </CardContent>
      </Card>
    </>
  );
};

export default MaterialListPage;
