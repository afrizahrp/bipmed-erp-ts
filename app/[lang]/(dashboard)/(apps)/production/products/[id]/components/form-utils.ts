import { CreateProductInput } from '@/utils/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(initialData: any, specData: CreateProductInput) {
  const specRemarks = specData?.remarks ?? '';
  // const productId = initialData?.id ?? '';
  return {
    /* general section */

    id: initialData?.id ?? '',
    name: initialData?.name ?? '',
    catalog_id: initialData?.catalog_id ?? '',
    category_id: initialData.category_id,
    images: initialData?.images ?? [],
    subCategory_id: initialData?.subCategory_id ?? '',
    brand_id: initialData?.brand_id ?? '',
    registered_id: initialData?.registered_id ?? '',
    uom_id: initialData?.uom_id ?? '',
    tkdn_pctg: initialData?.tkdn_pctg ?? 0,
    bmp_pctg: initialData?.bmp_pctg ?? 0,
    ecatalog_URL: initialData?.ecatalog_URL ?? '',
    remarks: initialData?.remarks ?? '',
    isMaterial: initialData?.isMaterial ?? false,
    slug: initialData?.slug ?? '',
    iShowedStatus: initialData?.iShowedStatus ?? false,
    iStatus: initialData?.iStatus ?? false,

    /* specification section */

    productId: initialData?.id ?? '',
    construction: specData?.construction ?? '',
    dimension: specData?.dimension ?? '',
    base: specData?.base ?? '',
    position: specData?.position ?? '',
    bodyFrame: specData?.bodyFrame ?? '',
    itemFunctions: specData?.itemFunctions ?? '',
    item_type: specData?.item_type ?? '',
    item_model: specData?.item_model ?? '',
    expired_at: specData?.expired_at ?? '',
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
    specRemarks: specData?.remarks ?? '',
  };
}

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
export const typeOption = [
  {
    value: 'digital product',
    label: 'Digital Product',
  },
  {
    value: 'physical product',
    label: 'Physical Product',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];
