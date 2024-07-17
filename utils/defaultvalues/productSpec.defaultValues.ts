import { ProductSpecFormValues } from '@/utils/schema/productSpec.form.schema';

export function productSpecdefaultValues(specData: ProductSpecFormValues) {
  return {
    /* specification section */

    construction: specData?.construction ?? '',
    dimension: specData?.dimension ?? '',
    base: specData?.base ?? '',
    position: specData?.position ?? '',
    bodyFrame: specData?.bodyFrame ?? '',
    itemFunctions: specData?.itemFunctions ?? '',
    item_type: specData?.item_type ?? '',
    item_model: specData?.item_model ?? '',
    mattress: specData?.mattress ?? '',
    mattressSize: specData?.mattressSize ?? '',
    mattressThickness: specData?.mattressThickness ?? '',
    finishing: specData?.finishing ?? '',
    powerSupply: specData?.powerSupply ?? '',
    loadCapacity: specData?.loadCapacity ?? '',
    systemFilter: specData?.systemFilter ?? '',
    accessories: specData?.accessories ?? '',
    sideRail: specData?.sideRail ?? '',
    ivStand: specData?.ivStand ?? '',
    wheels: specData?.wheels ?? '',
    maxLoad: specData?.maxLoad ?? '',
    size: specData?.size ?? '',
    weight: specData?.weight ?? '',
    standSize: specData?.standSize ?? '',
    basePlate: specData?.basePlate ?? '',
    cover: specData?.cover ?? '',
    material: specData?.material ?? '',
    coverMaterial: specData?.coverMaterial ?? '',
    typeScreen: specData?.typeScreen ?? '',
    powerConsumption: specData?.powerConsumption ?? '',
    lamp: specData?.lamp ?? '',
    movers: specData?.movers ?? '',
    rim: specData?.rim ?? '',
    custodyFeet: specData?.custodyFeet ?? '',
    foot: specData?.foot ?? '',
    footWear: specData?.footWear ?? '',
    pole: specData?.pole ?? '',
    inputVoltage: specData?.inputVoltage ?? '',
    outputVoltage: specData?.outputVoltage ?? '',
    sideGuard: specData?.sideGuard ?? '',
    footandheadPanel: specData?.footandheadPanel ?? '',
    temperatureControl: specData?.temperatureControl ?? '',
    top: specData?.top ?? '',
    foodTray: specData?.foodTray ?? '',
    traycorpse: specData?.traycorpse ?? '',
    pillowthecorpse: specData?.pillowthecorpse ?? '',
    lightPole: specData?.lightPole ?? '',
    sterilizing: specData?.sterilizing ?? '',
    filter: specData?.filter ?? '',
    underPressure: specData?.underPressure ?? '',
    foundationTray: specData?.foundationTray ?? '',
    door: specData?.door ?? '',
    handle: specData?.handle ?? '',
    medicineBox: specData?.medicineBox ?? '',
    handleTrolley: specData?.handleTrolley ?? '',
    drawer: specData?.drawer ?? '',
    remarks: specData?.remarks ?? '',
  };
}
