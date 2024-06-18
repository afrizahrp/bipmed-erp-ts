import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  params: {
    name: string | undefined;
  }
) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name' || undefined);

    const material = await prisma.products.findMany({
      where: {
        name: {
          contains: name?.toLowerCase(),
        },
        isMaterial: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(material);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

/*

example : 
  Search terms  : hospital bed
  Result        : hospital bed, bed hospital, hospital bed with wheels, hospital bed with mattress, bed,
                  bed with wheels, bed with mattress, hospital, wheels, mattress 

return all items that contain the search terms in any order and regardless of other words in the name, 
can split the search term into individual words 

import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  params: {
    name: string | undefined;
  }
) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name' || undefined);
    const nameParts = name?.toLowerCase().split(' ');

    const nameConditions = nameParts?.map(part => ({ name: { contains: part } })) || [];

    const category = await prisma.categories.findMany({
      where: {
        OR: nameConditions,
      },
    });
    return NextResponse.json(category);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

*/
