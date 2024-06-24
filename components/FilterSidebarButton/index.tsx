import { Table } from "@tanstack/react-table";
import { ProductsFilterSidebar } from "./productsFilterSidebar";
import { MaterialFilterSidebar } from "./materialFilterSidebar";
import { CategoryFilterSidebar } from "./categoryFilterSidebar";

interface FilterSidebarButtonProps<TData> {
  table: Table<TData>;
  pageName?: string;
}
export function FilterSidebarButton<TData>({
  table,
  pageName,
}: FilterSidebarButtonProps<TData>) {
  switch (pageName) {
    case "product":
      return <ProductsFilterSidebar table={table} />;
    case "material":
      return <MaterialFilterSidebar table={table} />;
    case "category":
      return <CategoryFilterSidebar table={table} />;
    default:
      return <div>No sidebar available for this page</div>;
  }
}

export default FilterSidebarButton;
