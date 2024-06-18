import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import getSubCategoryId from '../../system/getCategoryId/route';

import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const subcategories = await prisma.subCategories.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(subcategories);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const company = session?.user?.company || '';
//     const branch = session?.user?.branch || '';
//     const username = session?.user?.name || '';

//     const body = await request.json();
//     const { category_id, name, remarks, iStatus } = body as {
//       category_id: string;
//       name: string;
//       remarks: string;
//       iStatus: boolean;
//     };

//     const userId = username; //session.user.id // Use the user ID from the session
//     const subCategory_id = await getSubCategoryId(
//       company,
//       branch,
//       category_id,
//       userId
//     );

//     const newSubCategory = {
//       category_id: category_id,
//       id: subCategory_id,
//       name,
//       remarks,
//       iStatus,
//       createdBy: username,
//       updatedBy: username,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       company: company,
//       branch: branch,
//     };

//     const subCategory = await prisma.subCategories.create({
//       data: newSubCategory,
//     });

//     return NextResponse.json(subCategory, { status: 201 });
//   } catch (e) {
//     console.error(e);

//     return NextResponse.json(
//       {
//         message: 'Something went wrong while trying to create new category',
//         result: e,
//       },
//       { status: 500 }
//     );
//   }
// }
