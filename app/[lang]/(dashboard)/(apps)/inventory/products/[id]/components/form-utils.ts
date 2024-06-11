import { CreateProductInput } from "@/utils/validators/create-product.schema";
import isEmpty from "lodash/isEmpty";
import { register } from "module";

export function defaultValues(initialData: CreateProductInput) {
  return {
    /* general section */

    id: initialData?.id ?? "",
    name: initialData?.name ?? "",
    catalog_id: isEmpty(initialData?.catalog_id)
      ? initialData?.catalog_id
      : initialData?.catalog_id,

    registered_id: isEmpty(initialData?.registered_id)
      ? initialData?.registered_id
      : initialData?.registered_id,

    category_id: initialData.category_id,
    subCategory_id: initialData?.subCategory_id ?? "",

    brand_id: isEmpty(initialData?.brand_id)
      ? initialData?.brand_id
      : initialData?.brand_id,

    uom_id: isEmpty(initialData?.uom_id)
      ? initialData?.uom_id
      : initialData?.uom_id,

    tkdn_pctg: initialData?.tkdn_pctg ?? 0,
    bmp_pctg: initialData?.bmp_pctg ?? 0,

    ecatalog_URL: isEmpty(initialData?.ecatalog_URL)
      ? initialData?.ecatalog_URL
      : initialData?.ecatalog_URL,
    remarks: isEmpty(initialData?.remarks)
      ? initialData?.remarks
      : initialData?.remarks,
    isMaterial: initialData?.isMaterial ?? false,

    slug: isEmpty(initialData?.slug) ? initialData?.slug : initialData?.slug,
    iShowedStatus: initialData?.iShowedStatus ?? false,
    iStatus: initialData?.iStatus ?? false,

    // images: initialData?.images ?? [],

    /* specification section */

    // productId: initialData?.id ?? '',
    // construction: specData?.construction ?? '',
    // dimension: specData?.dimension ?? '',
    // base: specData?.base ?? '',
    // position: specData?.position ?? '',
    // bodyFrame: specData?.bodyFrame ?? '',
    // itemFunctions: specData?.itemFunctions ?? '',
    // item_type: specData?.item_type ?? '',
    // item_model: specData?.item_model ?? '',
    // expired_at: specData?.expired_at ?? '',
    // mattress: specData?.mattress ?? '',
    // mattressSize: specData?.mattressSize ?? '',
    // mattressThickness: specData?.mattressThickness ?? '',
    // finishing: specData?.finishing ?? '',
    // powerSupply: specData?.powerSupply ?? '',
    // loadCapacity: specData?.loadCapacity ?? '',
    // systemFilter: specData?.systemFilter ?? '',
    // accessories: specData?.accessories ?? '',
    // sideRail: specData?.sideRail ?? '',
    // ivStand: specData?.ivStand ?? '',
    // wheels: specData?.wheels ?? '',
    // maxLoad: specData?.maxLoad ?? '',
    // size: specData?.size ?? '',
    // weight: specData?.weight ?? '',
    // standSize: specData?.standSize ?? '',
    // basePlate: specData?.basePlate ?? '',
    // cover: specData?.cover ?? '',
    // material: specData?.material ?? '',
    // coverMaterial: specData?.coverMaterial ?? '',
    // typeScreen: specData?.typeScreen ?? '',
    // powerConsumption: specData?.powerConsumption ?? '',
    // lamp: specData?.lamp ?? '',
    // movers: specData?.movers ?? '',
    // rim: specData?.rim ?? '',
    // custodyFeet: specData?.custodyFeet ?? '',
    // foot: specData?.foot ?? '',
    // footWear: specData?.footWear ?? '',
    // pole: specData?.pole ?? '',
    // inputVoltage: specData?.inputVoltage ?? '',
    // outputVoltage: specData?.outputVoltage ?? '',
    // sideGuard: specData?.sideGuard ?? '',
    // footandheadPanel: specData?.footandheadPanel ?? '',
    // temperatureControl: specData?.temperatureControl ?? '',
    // top: specData?.top ?? '',
    // foodTray: specData?.foodTray ?? '',
    // traycorpse: specData?.traycorpse ?? '',
    // pillowthecorpse: specData?.pillowthecorpse ?? '',
    // lightPole: specData?.lightPole ?? '',
    // sterilizing: specData?.sterilizing ?? '',
    // filter: specData?.filter ?? '',
    // underPressure: specData?.underPressure ?? '',
    // foundationTray: specData?.foundationTray ?? '',
    // door: specData?.door ?? '',
    // handle: specData?.handle ?? '',
    // medicineBox: specData?.medicineBox ?? '',
    // handleTrolley: specData?.handleTrolley ?? '',
    // drawer: specData?.drawer ?? '',
    // specRemarks: specData?.remarks ?? '',
  };
}
