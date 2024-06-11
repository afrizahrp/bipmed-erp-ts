import { prisma } from '@/lib/client';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import getDocumentId from '../../system/getDocumentId/route';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const categoryTypes = await prisma.categoryTypes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(categoryTypes);
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
//     const { type, name, remarks, imageURL, iStatus, status, iShowedStatus } =
//       body as {
//         type: number;
//         name: string;
//         remarks: string;
//         imageURL: string;
//         iStatus: boolean;
//         status: string;
//         iShowedStatus: boolean;
//       };

//     // const company = 'BIP';
//     // const branch = 'BIP';
//     const moduleId = 'PO'; // Replace with your actual data
//     const prefixId = 'SU'; // Replace with your actual data
//     const userId = username; //session.user.id // Use the user ID from the session
//     const docId = await getDocumentId(
//       company,
//       branch,
//       moduleId,
//       prefixId,
//       new Date(),
//       userId
//     );

//     const newCategories = {
//       company: company,
//       branch: branch,
//       type,
//       name,
//       id: docId,
//       remarks,
//       imageURL,
//       status: 'Aktif',
//       createdBy: username,
//       updatedBy: username,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     const category = await prisma.categories.create({
//       data: newCategories,
//     });

//     return NextResponse.json(category, { status: 201 });
//   } catch (e) {
//     console.error(e);

//     // await resetDocumentId('PO', 'SU');

//     return NextResponse.json(
//       {
//         message: 'Something went wrong while trying to create new categories',
//         result: e,
//       },
//       { status: 500 }
//     );
//   }
// }
