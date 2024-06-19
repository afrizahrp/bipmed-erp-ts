import { CategoryFormValues } from "@/utils/schema/categoryFormSchema";
import isEmpty from "lodash/isEmpty";

export function defaultValues(initialData: CategoryFormValues) {
  return {
    /* general section */
    imageURL: initialData?.imageURL ?? "",
    id: initialData?.id ?? "",
    type: isEmpty(initialData?.type) ? initialData?.type : initialData?.type,
    name: initialData?.name ?? "",
    remarks: isEmpty(initialData?.remarks)
      ? initialData?.remarks
      : initialData?.remarks,

    iStatus: initialData?.iStatus ?? false,
    href: isEmpty(initialData?.href) ? initialData?.href : initialData?.href,
    slug: isEmpty(initialData?.slug) ? initialData?.slug : initialData?.slug,
    icon: isEmpty(initialData?.icon) ? initialData?.icon : initialData?.icon,
    createdBy: isEmpty(initialData?.createdBy)
      ? initialData?.createdBy
      : initialData?.createdBy,
    updatedBy: isEmpty(initialData?.updatedBy)
      ? initialData?.updatedBy
      : initialData?.updatedBy,
    createdAt: isEmpty(initialData?.createdAt)
      ? initialData?.createdAt
      : initialData?.createdAt,
    updatedAt: isEmpty(initialData?.updatedAt)
      ? initialData?.updatedAt
      : initialData?.updatedAt,
    company: isEmpty(initialData?.company)
      ? initialData?.company
      : initialData?.company,
    branch: isEmpty(initialData?.branch)
      ? initialData?.branch
      : initialData?.branch,

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
