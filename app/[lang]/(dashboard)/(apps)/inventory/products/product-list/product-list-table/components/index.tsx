"use client";

import { DataTable } from "./data-table";
import { ProductColumn, columns } from "./columns";
interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductListTable: React.FC<ProductsClientProps> = ({ data }) => {


  return (

      <div>
        <DataTable columns={columns} data={data} />
      </div>

  );
};
