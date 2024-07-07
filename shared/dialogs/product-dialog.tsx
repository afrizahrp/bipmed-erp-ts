'use client';

import Modal from '@/components/ui/modal';
import useProductDialog from '@/hooks/use-product-dialog';
import Gallery from '@/components/gallery';
import ProductFormQuickEdit from '@/shared/quick-edit/product-form-quick-edit';

const ProductDialog = () => {
  const productDialog = useProductDialog();
  const product = useProductDialog((state) => state.data);

  if (!product) {
    return null;
  }

  const imageExist = product.images.length > 0;
  console.log('productImage', imageExist);

  return (
    <Modal open={productDialog.isOpen} onClose={productDialog.onClose}>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
        {/* <div className='w-full lg:w-1/2 lg:sticky pt-3 h-max'> */}
        <div
          className={`w-full ${imageExist ? 'lg:w-1/2 lg:sticky h-max' : 'lg:w-full'}`}
          // className={`w-full ${!product.images || product.images.length === 0 ? 'lg:w-1/2' : 'lg:w-full lg:sticky h-max'}`}
        >
          Product Id / Catalog: {product?.id} / {product?.catalog_id}
          <ProductFormQuickEdit data={product} />
        </div>

        {product && product.images && (
          <div className='w-full lg:w-1/2 flex flex-col gap-6 border-gray drop-shadow-md pt-3 '>
            <Gallery images={product.images} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductDialog;
