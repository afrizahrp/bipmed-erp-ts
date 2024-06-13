import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import getProductId from '../../system/getProductId/route';

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const company = session?.user?.company || '';
    const branch = session?.user?.branch || '';
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

      iShowedStatus,
      createdBy,
      updatedBy,
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
      iStatus: string;
      images: { imageURL: string }[];

      iShowedStatus: number;
      createdBy: string;
      created_at: string;
      updatedBy: string;
      updated_at: string;
    };

    const userId = userName;
    const productId = await getProductId(company, branch, category_id, userId);

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
      iShowedStatus,

      images: {
        deleteMany: {},
      },
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: company,
      branch: branch,
    };

    const product = await prisma.products.create({
      data: {
        ...newProduct,
        images: {
          createMany: {
            data: images.map((image: { imageURL: string }) => ({
              imageURL: image.imageURL,
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
