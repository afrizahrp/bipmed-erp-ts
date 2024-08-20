import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productSpec = await prisma.productSpecs.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(productSpec);
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
  const session = await currentUser();
  const company_id = session?.company_id || '';
  const branch_id = session?.branch_id || '';
  const userName = session?.name || '';
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await request.json();
    const {
      itemFunctions,
      item_type,
      item_model,
      construction,
      mattress,
      mattressSize,
      mattressThickness,
      finishing,
      dimension,
      powerSupply,
      loadCapacity,
      systemFilter,
      accessories,
      sideRail,
      ivStand,
      wheels,
      maxLoad,
      size,
      weight,
      standSize,
      position,
      base,
      basePlate,
      cover,
      material,
      coverMaterial,
      typeScreen,
      powerConsumption,
      lamp,
      movers,
      rim,
      custodyFeet,
      foot,
      footWear,
      pole,
      inputVoltage,
      outputVoltage,
      sideGuard,
      footandheadPanel,
      temperatureControl,
      top,
      foodTray,
      traycorpse,
      pillowthecorpse,
      lightPole,
      sterilizing,
      filter,
      bodyFrame,
      underPressure,
      foundationTray,
      door,
      handle,
      medicineBox,
      handleTrolley,
      drawer,
      systemControl,
      bodyFrameWork,
      specremarks,
    } = body as {
      itemFunctions: string;
      item_type: string;
      item_model: string;
      construction: string;
      mattress: string;
      mattressSize: string;
      mattressThickness: string;
      finishing: string;
      dimension: string;
      powerSupply: string;
      loadCapacity: string;
      systemFilter: string;
      accessories: string;
      sideRail: string;
      ivStand: string;
      wheels: string;
      maxLoad: string;
      size: string;
      weight: string;
      standSize: string;
      position: string;
      base: string;
      basePlate: string;
      cover: string;
      material: string;
      coverMaterial: string;
      typeScreen: string;
      powerConsumption: string;
      lamp: string;
      movers: string;
      rim: string;
      custodyFeet: string;
      foot: string;
      footWear: string;
      pole: string;
      inputVoltage: string;
      outputVoltage: string;
      sideGuard: string;
      footandheadPanel: string;
      temperatureControl: string;
      top: string;
      foodTray: string;
      traycorpse: string;
      pillowthecorpse: string;
      lightPole: string;
      sterilizing: string;
      filter: string;
      bodyFrame: string;
      underPressure: string;
      foundationTray: string;
      door: string;
      handle: string;
      medicineBox: string;
      handleTrolley: string;
      drawer: string;
      systemControl: string;
      bodyFrameWork: string;
      specremarks: string;
    };

    const productSpec = await prisma.productSpecs.findUnique({
      where: { id: params.id },
    });
    if (!productSpec)
      return NextResponse.json(
        { error: 'Specification not found' },
        { status: 404 }
      );
    const editProductSpec = {
      itemFunctions,
      item_type,
      item_model,
      construction,
      mattress,
      mattressSize,
      mattressThickness,
      finishing,
      dimension,
      powerSupply,
      loadCapacity,
      systemFilter,
      accessories,
      sideRail,
      ivStand,
      wheels,
      maxLoad,
      size,
      weight,
      standSize,
      position,
      base,
      basePlate,
      cover,
      material,
      coverMaterial,
      typeScreen,
      powerConsumption,
      lamp,
      movers,
      rim,
      custodyFeet,
      foot,
      footWear,
      pole,
      inputVoltage,
      outputVoltage,
      sideGuard,
      footandheadPanel,
      temperatureControl,
      top,
      foodTray,
      traycorpse,
      pillowthecorpse,
      lightPole,
      sterilizing,
      filter,
      bodyFrame,
      underPressure,
      foundationTray,
      door,
      handle,
      medicineBox,
      handleTrolley,
      drawer,
      systemControl,
      bodyFrameWork,
      specremarks,
      updatedBy: userName,
      updatedAt: new Date(),
    };

    const updatedProductSpec = await prisma.productSpecs.update({
      where: { id: params.id },
      data: editProductSpec,
    });

    return NextResponse.json(updatedProductSpec);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message:
          'Something went wrong while trying to updating product specification',
        result: e,
      },
      { status: 500 }
    );
  }
}
