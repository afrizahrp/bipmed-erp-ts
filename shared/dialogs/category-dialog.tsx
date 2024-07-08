'use client';

import Modal from '@/components/ui/modal';
import useCategoryDialog from '@/hooks/use-category-dialog';
import Gallery from '@/components/gallery';
import CategoryFormQuickEdit from '@/shared/quick-edit/category-form-quick-edit';

const CategoryDialog = () => {
  const categoryDialog = useCategoryDialog();
  const category = useCategoryDialog((state) => state.data);

  if (!category) {
    return null;
  }

  const imageExist = category.imageURL;

  console.log(imageExist);

  return (
    <Modal open={categoryDialog.isOpen} onClose={categoryDialog.onClose}>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
        <div className='w-full lg:w-full lg:sticky pt-3 h-max'>
          {/* <div
          className={`w-full pt-3 gap-12 ${imageExist === 0 ? 'w-full' : 'lg:w-1/2 lg:sticky h-max'}`}
        > */}

          <div>Category Id : {category?.id}</div>
          <div>
            <CategoryFormQuickEdit data={category} />
          </div>
        </div>

        {/* {imageExist ? (
          <div className='w-full flex flex-col gap-6 drop-shadow-md justify-center px-4'>
            <Gallery images={category.images} />
          </div>
        ) : null} */}
      </div>
    </Modal>
  );
};

export default CategoryDialog;
