import { prisma } from '@/lib/client';
import { CategoryListTable } from './category-list-table';
import { CertficateColumns } from './category-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Certificate List',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'Certificate List',
    },
  ],
};

const CertificateListPage = async () => {
  const certificates = await prisma.certificates.findMany({
    where: {
      iStatus: true,
      images: {
        some: {},
      },
    },
    include: {
      images: true,
      status: true,
      showStatus: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedCategories: CertficateColumns[] =
    certificates?.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      iShowedStatus: item.iShowedStatus as boolean,
      showStatus: item.showStatus.name,
      remarks: item?.remarks ?? '',
      images: item.images.map((image) => image.imageURL),
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className="mt-6">
          <CardContent className="p-10">
            <CategoryListTable data={formattedCategories} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CertificateListPage;
