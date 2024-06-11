import { prisma } from '@/prisma/client';
import getDocumentId from '../../system/getDocumentId/route';
import resetDocumentId from '@/app/api/resetDocumentId/[counter_id]/route';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

// import { useSession } from 'next-auth/react'

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
    const suppliers = await prisma.suppliers.findMany({
      where: {
        name: {
          contains: name?.toLowerCase(),
        },
      },
    });

    return NextResponse.json(suppliers);
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
    const username = session?.user?.name || '';

    const body = await request.json();
    const {
      supplier_type,
      href,
      name,
      address,
      post_cd,
      tel_no,
      fax_no,
      contact_person,
      primary_mobileNo,
      secondary_mobileNo,
      email,
      credit_term,
      currency_cd,
      remarks,
      iStatus,
      createdBy,
      updatedBy,
    } = body as {
      supplier_type: string;
      href: string;
      name: string;
      address: string;
      post_cd: string;
      tel_no: string;
      fax_no: string;
      contact_person: string;
      primary_mobileNo: string;
      secondary_mobileNo: string;
      email: string;
      iStatus: boolean;
      status: string;
      credit_term: number;
      currency_cd: string;
      remarks: string;
      createdBy: string;
      updatedBy: string;
      company: string;
      branch: string;
    };

    // const company = 'BIP';
    // const branch = 'BIP';
    const moduleId = 'PO'; // Replace with your actual data
    const prefixId = 'SU'; // Replace with your actual data
    const userId = username; //session.user.id // Use the user ID from the session
    const docId = await getDocumentId(
      company,
      branch,
      moduleId,
      prefixId,
      new Date(),
      userId
    );

    const newSupplier = {
      supplier_type,
      href,
      id: docId,
      supplier_cd: docId, // Set the document ID here
      name,
      address,
      post_cd,
      tel_no,
      fax_no,
      contact_person,
      primary_mobileNo,
      secondary_mobileNo,
      email,
      iStatus: true,
      credit_term,
      currency_cd,
      remarks,
      createdBy: username,
      updatedBy: username,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: company,
      branch: branch,
    };

    const supplier = await prisma.suppliers.create({
      data: newSupplier,
    });

    return NextResponse.json(supplier, { status: 201 });
  } catch (e) {
    console.error(e);

    // await resetDocumentId('PO', 'SU');

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to create new supplier',
        result: e,
      },
      { status: 500 }
    );
  }
}
