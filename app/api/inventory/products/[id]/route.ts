import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(products);
}
// function extractPublicIdFromCloudinaryUrl(urls: string[]): string[] {
//   return urls.map((url) => {
//     const parts = url.split('/');
//     return parts[parts.length - 1].split('.')[0];
//   });
// }

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const company_id = session?.user?.company_id || '';
    const branch_id = session?.user?.branch_id || '';
    const userName = session?.user?.name || '';
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();

    const {
      name,
      registered_id,
      catalog_id,
      category_id,
      subCategory_id,
      brand_id,
      uom_id,
      iStatus,
      remarks,
      tkdn_pctg,
      bmp_pctg,
      ecatalog_URL,
      iShowedStatus,
      slug,
    } = body as {
      name: string;
      registered_id: string;
      catalog_id: string;
      category_id: string;
      subCategory_id: string;
      brand_id: string;
      uom_id: string;
      iStatus: boolean;
      remarks: string;
      tkdn_pctg: number;
      bmp_pctg: number;
      ecatalog_URL: string;
      iShowedStatus: boolean;
      slug: string;
    };

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Product id is not found', {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse('Product name is required', { status: 400 });
    }
    const product = await prisma.products.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        category_id,
        subCategory_id,
        brand_id,
        uom_id,

        // images: {
        //   deleteMany: {},
        // },
        iStatus,
        remarks,
        registered_id,
        catalog_id,
        tkdn_pctg,
        bmp_pctg,
        ecatalog_URL,
        iShowedStatus,
        slug,
        isMaterial: false,
        updatedBy: userName,
        updatedAt: new Date(),
      },
    });

    // let urls = images.map((image) => image.imageURL);
    // const publicIds = extractPublicIdFromCloudinaryUrl(urls); // Extract the public ID from the Cloudinary URL

    // const currentProduct = await prisma.products.findUnique({
    //   // Get the current product createdBy and createdAt fields
    //   where: {
    //     id: params.id,
    //   },
    //   select: {
    //     createdBy: true, // Select only the createdBy and createdAt fields
    //     createdAt: true,
    //   },
    // });

    // const productCreatedBy = currentProduct?.createdBy;
    // const productCreatedAt = currentProduct?.createdAt;

    // const imageData = images.map(
    //   (image: { imageURL: string; id?: string }, index: number) => ({
    //     id: publicIds[index], // Use the public ID as the image ID
    //     imageURL: image.imageURL,
    //     isPrimary: false,
    //     createdBy: productCreatedBy,
    //     createdAt: productCreatedAt,
    //     updatedBy: userName,
    //     updatedAt: new Date(),
    //     company_id: company_id,
    //     branch_id: branch_id,
    //   })
    // );

    // const product = await prisma.products.update({
    //   where: {
    //     id: params.id,
    //   },
    //   data: {
    //     ...body,
    //   },
    // });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
