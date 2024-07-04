import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { ProductColumn } from './columns';
import { Products } from '@/types';

interface CellActionProps {
  id: string;
}

export const CellAction: React.FC<CellActionProps> = ({
  id,
}: CellActionProps) => {
  const router = useRouter();

  const onClick = () => {
    console.log('CellAction', id);

    router.push(`/inventory/products/quick-edit/${id}`);
    // router.push(`/inventory/products/${id}`);
  };

  return (
    <>
      {/* <AlertModal
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}

      <Button variant='ghost' className='h-8 w-8 p-0' onClick={onClick}>
        <span className='sr-only'>Open menu</span>
        <MoreVertical className='h-4 w-4' />
      </Button>
    </>
  );
};
