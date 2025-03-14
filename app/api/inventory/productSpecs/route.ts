import { currentUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const productspecs = await prisma.productSpecs.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(productspecs);
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
    const session = await currentUser();
    const company_id = session?.company_id || '';
    const branch_id = session?.branch_id || '';
    const userName = session?.name || '';

    const body = await request.json();

    const {
      id,
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
      id: string;
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

    const newProductSpec = {
      id,
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
      createdBy: userName,
      updatedBy: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
      company_id: company_id,
      branch_id: branch_id,
    };

    const productSpec = await prisma.productSpecs.create({
      data: newProductSpec,
    });

    return NextResponse.json(productSpec, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message:
          'Something went wrong while trying to create new product specification',
        result: e,
      },
      { status: 500 }
    );
  }
}
