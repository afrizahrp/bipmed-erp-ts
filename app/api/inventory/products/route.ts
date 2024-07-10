import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
// import getProductId from '../../system/getProductId/route';

interface QueryResult {
  doc_id: string;
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.products.findMany({
      where: {
        isMaterial: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

async function getProductId(
  companyId: string,
  branchId: string,
  prefixId: string,
  userId: string
): Promise<string> {
  try {
    const result: QueryResult[] =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_ProductId ${companyId}, ${branchId},  ${prefixId},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
    return docId;
  } catch (e) {
    console.error(e);

    throw new Error('Something went wrong while trying to get document ID');
  }
}

function extractPublicIdFromCloudinaryUrl(arg0: { url: string[] }): string {
  const { url } = arg0;
  const publicIds: string[] = [];

  url.forEach((imageUrl) => {
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      publicIds.push(publicId);
    }
  });

  return publicIds.join(',');
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';

    const body = await request.json();
    const {
      name,
      catalog_id,
      registered_id,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      tkdn_pctg,
      bmp_pctg,
      ecatalog_URL,
      remarks,
      iStatus,
      images,
      slug,
      iShowedStatus,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = body as {
      name: string;
      catalog_id: string;
      registered_id: string;
      category_id: string;
      subCategory_id: string;
      brand_id: string;
      uom_id: string;
      tkdn_pctg: number;
      bmp_pctg: number;
      ecatalog_URL: string;
      remarks: string;
      iStatus: boolean;
      images: { imageURL: string }[];
      slug: string;
      iShowedStatus: boolean;
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };

    const userId = userName;
    const productId = await getProductId(
      company_id,
      branch_id,
      category_id,
      userId
    );

    const newProduct = {
      id: productId,
      name,
      catalog_id,
      registered_id,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      tkdn_pctg,
      bmp_pctg,
      ecatalog_URL,
      remarks,
      iStatus,
      slug,
      iShowedStatus,
      isMaterial: false,
      images: {
        deleteMany: {},
      },
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    let url = images.map((image: { imageURL: string }) => image.imageURL);
    const publicIds = extractPublicIdFromCloudinaryUrl({ url });
    console.log('public id', publicIds);

    const product = await prisma.products.create({
      data: {
        ...newProduct,
        images: {
          createMany: {
            data: images.map((image: { imageURL: string }) => ({
              id: publicIds,
              imageURL: image.imageURL,
              product_id: productId,
              isPrimary: false,
              createdBy: userName,
              updatedBy: userName,
              createdAt: new Date(),
              updatedAt: new Date(),
              company_id: company_id,
              branch_id: branch_id,
            })),
          },
        },
      },
      // newProduct: {
      //   images: {
      //     createMany: {
      //       newProduct: [...images.map((image: { imageURL: string }) => image)],
      //     },
      //   },
      // },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
