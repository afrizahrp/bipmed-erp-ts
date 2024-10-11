import { prisma } from '@/lib/client';
import { CertificateListTable } from './certificate-list-table';
import { CertificateColumn } from './certificate-list-table/components/columns';
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
      name: 'List',
    },
  ],
};

const CertificateListPage = async () => {
  const certificate = await prisma.certificates.findMany({
    include: {
      images: true,
      status: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedCertificate: CertificateColumn[] =
    certificate?.map((item) => ({
      id: item.id,
      name: item.name,
      iStatus: item.iStatus, // Add type assertion to ensure iStatus is always a boolean
      status: item.status?.name,
      remarks: item?.remarks,
      images: item.images.map((image) => image.imageURL),
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className="mt-6">
          <CardContent className="p-10">
            <CertificateListTable data={formattedCertificate} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CertificateListPage;
