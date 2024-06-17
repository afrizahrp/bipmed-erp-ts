export interface Products {
  id: string;
  name: string;
}

export interface SearchResponse {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

export interface Categories {
  id: string;
  name: string;
}
