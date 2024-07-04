'use client';

// import usePreviewModal from '@/hooks/use-preview-modal';
// import Gallery from '@/components/gallery';
import Modal from '@/components/ui/modal';
// import { PreviewProduct } from './preview-product';

// import { Button } from './ui/button';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>{children}</div>
    </Modal>
  );
};
export default PreviewModal;
