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

  const imageExist = product.images.length;

  return (
    <Modal open={productDialog.isOpen} onClose={productDialog.onClose}>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
        {/* <div className='w-full lg:w-1/2 lg:sticky pt-3 h-max'> */}
        <div
          className={`w-full pt-3 gap-12 ${imageExist === 0 ? 'w-full' : 'lg:w-1/2 lg:sticky h-max'}`}
        >
          {product?.catalog_id ? (
            <div className='text-lg font-semibold'>
              Catalog : {product?.catalog_id}
            </div>
          ) : null}
          <div>Product Id : {product?.id}</div>
          <div>
            <ProductFormQuickEdit data={product} />
          </div>
        </div>

        {imageExist ? (
          <div className='w-full lg:w-1/2 flex flex-col gap-6 drop-shadow-md pt-6 mx-3'>
            <Gallery images={product.images} />
          </div>
        ) : null}
        {/* (
          <div className='flex items-center justify-center'>
            No image available
          </div>
        )} */}
      </div>
    </Modal>
  );
};

export default ProductDialog;
