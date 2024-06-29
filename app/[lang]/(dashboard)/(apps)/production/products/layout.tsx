import { ReactNode } from 'react';

export const metadata = {
  title: "Products"
}
const ProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default ProductLayout; 