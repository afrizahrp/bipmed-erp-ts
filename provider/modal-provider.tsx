'use client';
import { useEffect, useState, ReactNode } from 'react';
import PreviewModal from '@/components/preview-modal';

interface ModalContent {
  children?: ReactNode;
}

const ModalProvider = ({ children }: ModalContent) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
