import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import checkMaterialId from '../../system/checkMaterialId/route';
import getMaterialId from './../../system/getMaterialId/route';

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.products.findMany({
      where: {
        isMaterial: true,
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
      isMaterial,
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
      isMaterial: boolean;
      iShowedStatus: number;
      createdBy: string;
      created_at: string;
      updatedBy: string;
      updated_at: string;
    };

    const userId = userName;

    const materialId = await getMaterialId(
      company,
      branch,
      category_id,
      userId
    );

    const newMaterial = {
      id: materialId,
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
      isMaterial: true,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: company,
      branch: branch,
    };

    const material = await prisma.products.create({
      data: {
        ...newMaterial,
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong while trying to create new material' },
      { status: 500 }
    );
  }
}
