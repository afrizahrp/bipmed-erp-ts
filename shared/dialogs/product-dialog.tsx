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

  return (
    <Modal open={productDialog.isOpen} onClose={productDialog.onClose}>
      <div className='grid grid-cols-[6fr,3fr] gap-12'>
        <div>
          <div className='grid w-full items-start'>
            <div>
              Product Id / Catalog: {product?.id} / {product?.catalog_id}
            </div>
            {/* </div>

          <div className='w-full'> */}
            <ProductFormQuickEdit data={product} />
          </div>
        </div>

        {/* <div className='border-2 border-gray-300'> */}
        {product && product.images && (
          <div className='flex items-end justify-end'>
            <Gallery images={product.images} />
          </div>
        )}
        {/* </div> */}
      </div>
    </Modal>
  );
};

export default ProductDialog;
