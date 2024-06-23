export type Products = {
  id: string;
  catalog_id: string;
  name: string;
};

export type CategoryTypes = {
  id: string;
  name: string;
};

export type Categories = {
  type: string;
  id: string;
  name: string;
  imageURL: string;
  remarks: string;
  iStatus: boolean;
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
  id: string;
  name: string;
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
