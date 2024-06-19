import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
// import getCategoryId from '../../system/getCategoryId/route';

import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      where: { slug: { not: 'noname' } },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(categories);
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
//     const { type, name, remarks, imageURL, iStatus, iShowedStatus } = body as {
//       type: string;
//       name: string;
//       remarks: string;
//       imageURL: string;
//       iStatus: boolean;
//       iShowedStatus: boolean;
//     };

//     const categoryType = type;
//     const userId = username; //session.user.id // Use the user ID from the session
//     const categoryId = await getCategoryId(
//       company,
//       branch,
//       categoryType,
//       userId
//     );

//     const newCategory = {
//       type,
//       name,
//       id: categoryId,
//       remarks,
//       imageURL,
//       iStatus,
//       iShowedStatus,
//       createdBy: username,
//       updatedBy: username,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       company: company,
//       branch: branch,
//     };

//     const category = await prisma.categories.create({
//       data: newCategory,
//     });

//     return NextResponse.json(category, { status: 201 });
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
