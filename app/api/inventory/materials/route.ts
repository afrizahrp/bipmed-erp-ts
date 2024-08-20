import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';
interface QueryResult {
  doc_id: string;
}

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

async function getMaterialId(
  companyId: string,
  branchId: string,
  prefixId: string,
  userId: string
): Promise<string> {
  try {
    const result: QueryResult[] =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_MaterialId ${companyId}, ${branchId},  ${prefixId},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
    return docId;
  } catch (e) {
    console.error(e);

    throw new Error('Something went wrong while trying to get document ID');
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

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
      iStatus,
      remarks,
      slug,
      isMaterial,
      iShowedStatus,
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
      iStatus: boolean;
      remarks: string;
      slug: string;
      isMaterial: boolean;
      iShowedStatus: boolean;
    };

    const userId = userName;

    const materialId = await getMaterialId(
      company_id,
      branch_id,
      category_id,
      userId
    );

    const newMaterial = {
      id: materialId,
      name,
      catalog_id: '',
      registered_id: '',
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      tkdn_pctg: 0,
      bmp_pctg: 0,
      ecatalog_URL: '',
      iStatus,
      remarks,
      slug: '',
      isMaterial: true,
      iShowedStatus: false,
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const material = await prisma.products.create({
      data: newMaterial,
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
