'use client';

import { useEffect, useState } from 'react';

import ProductDialog from '@/shared/dialogs/product-dialog';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProductDialog />
    </>
  );
};

export default ModalProvider;
