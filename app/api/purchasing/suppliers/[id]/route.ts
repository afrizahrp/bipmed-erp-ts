import { prisma } from 'prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const suppliers = await prisma.po_supplier.findUnique({
      where: {
        id: params.id,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const username = session?.user?.username || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  // const body = await request.json();
  // const validation = patchIssueSchema.safeParse(body);
  // if (!validation.success)
  //   return NextResponse.json(validation.error.format(), {
  //     status: 400,
  //   });
  try {
    const body = await request.json();
    const {
      id,
      supplier_cd,
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
      status,
    } = body as {
      id: string;
      supplier_cd: string;
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
      credit_term: number;
      currency_cd: string;
      remarks: string;
      iStatus: boolean;
      status: string;
    };

    // if (assignedToUserId) {
    // const user = await prisma.user.findUnique({
    //   where: { id },
    // });
    // if (!user)
    //   return NextResponse.json({ error: 'Supplier tidak ada.' }, { status: 400 });
    // // }

    const supplier = await prisma.po_supplier.findUnique({
      where: { id: params.id },
    });
    if (!supplier)
      return NextResponse.json(
        { error: 'Supplier tidak ditemukan' },
        { status: 404 }
      );
    const editSupplier = {
      supplier_type,
      href,
      id,
      supplier_cd,
      name,
      address,
      post_cd,
      tel_no,
      fax_no,
      contact_person,
      primary_mobileNo,
      secondary_mobileNo,
      email,
      iStatus,
      status: iStatus ? 'Aktif' : 'Tidak Aktif',
      credit_term,
      currency_cd,
      remarks,
      updatedBy: username,
      updatedAt: new Date(),
    };

    const updatedSupplier = await prisma.po_supplier.update({
      where: { id: params.id },
      data: editSupplier,
    });

    return NextResponse.json(updatedSupplier);
  } catch (e) {
    console.error(e);

    // await resetDocumentId('PO', 'SU');

    return NextResponse.json(
      {
        message: 'Something went wrong while trying to updating supplier',
        result: e,
      },
      { status: 500 }
    );
  }
}
