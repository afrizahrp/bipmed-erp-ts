export interface Products {
  id: string;
  catalog_id?: string;
  catalog?: string | null;
  registered_id?: string;
  name?: string | null;
  category_id: string | null;
  category?: string | null;
  subCategory_id?: string;
  uom_id?: string;
  brand_id?: string;
  tkdn_pctg?: number;
  bmp_pctg?: number;
  ecatalog_URL?: string;
  iStatus?: boolean;
  remarks?: string | null;
  isMaterial?: boolean;
  iShowedStatus?: boolean;
  slug?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  company?: string;
  branch?: string;
  images: ProductImages[];
}

export interface ProductImages {
  id: string;
  product_id: string;
  imageURL: string;
  isPrimary: boolean;
}

export type CategoryTypes = {
  id: string;
  name: string;
};

export type Categories = {
  type?: string;
  id?: string;
  name?: string;
  imageURL?: string | undefined;
  remarks?: string;
  iStatus?: boolean;
};

export type Materials = {
  id: string;
  name: string;
  category_id: string;
  subCategory_id: string;
  uom_id: string;
  brand_id: string;
  iStatus: boolean;
  remarks: string;
  isMaterial: boolean;
};

export type MaterialCategories = {
  id: string;
  name: string;
};

export type SubCategories = {
  category_id: string;
  id: string;
  name: string;
};

export type Uoms = {
  id: string | '';
  name: string | '';
};

export type Brands = {
  id: string;
  name: string;
};

// export interface SearchResponse {
//   products: Products[];
//   total: number;
//   skip: number;
//   limit: number;
// }

// export interface Categories {
//   id: string;
//   name: string;
// }
