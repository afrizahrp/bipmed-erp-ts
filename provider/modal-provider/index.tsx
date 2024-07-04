'use client';
import { useEffect, useState, ReactNode } from 'react';
import PreviewModal from '@/components/preview-modal';

interface ModalContent {
  children?: ReactNode;
  //   title: string;
  //   content: ReactNode;
}

const ModalProvider = ({ children }: ModalContent) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalContent, setModalContent] = useState<ModalContent>({
  //   title: '',
  //   content: null,
  // });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModalWithContent = (title: string, content: ReactNode) => {
    // setModalContent({ title, content });
    setIsModalOpen(true);
  };

  // Example function to open modal for a product
  const showProductDetails = (
    productName: string,
    productDescription: ReactNode
  ) => {
    openModalWithContent(productName, <div>{productDescription}</div>);
  };

  // Example function to open modal for a category
  const showCategoryDetails = (
    categoryName: string,
    categoryDescription: ReactNode
  ) => {
    openModalWithContent(categoryName, <div>{categoryDescription}</div>);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {children}
      </PreviewModal>
    </>
  );
};

export default ModalProvider;
