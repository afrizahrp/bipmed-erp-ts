import { prisma } from '@/lib/client';
// import usePreviewModal from '@/hooks/use-preview-modal';
import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';
import { ProductFormQuickEdit } from '../../../quick-edit/[id]/product-form-quick-edit';

// import { ProductFormQuickEdit } from '@/apps/inventory/products/quick-edit/[id]/product-form-quick-edit';

interface QuickEditProductProps {
  open: boolean;
  onClose: () => void;
}

const QuickEditProduct = async ({
  params,
}: {
  params: {
    id: string;
    category_id: string;
    subCategory_id: string;
    brand_id: string;
    uom_id: string;
  };
}) => {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
    },
  });

  // const previewModal = usePreviewModal();
  // const viewProduct = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    // <Modal open={open} onClose={onClose}>
    <Modal>
      <div className='grid grid-cols-[6fr,3fr] gap-8'>
        <div>
          {/* Product Id / Name */}
          <div className='grid w-full items-start'>
            <div>Catalog: {product.catalog_id}</div>
            <div>
              Product: {product.id}-{product.name}
            </div>
          </div>

          <div>
            <ProductFormQuickEdit data={product} loading={false} />
          </div>
        </div>

        {/* <div className='w-full'>
          {product && product.images && (
            <div>
              <Gallery images={product.images} />
            </div>
          )}
        </div> */}
      </div>
    </Modal>
  );
};

export default QuickEditProduct;
