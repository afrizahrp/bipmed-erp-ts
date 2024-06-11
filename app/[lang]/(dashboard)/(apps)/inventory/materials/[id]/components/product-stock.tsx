import FormGroup from './form-group';
import cn from '@/lib/class-names';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductStockProps {
  className?: string;
}

export const ProductStock = ({ className }: ProductStockProps) => {

  return (
    <div className={cn(className)}>
      <FormGroup label='Stock'>
        <input
          type='number'
          className='w-full form-input'
        />
      </FormGroup>
      <FormGroup label='Stock Alert'>
        <input
          type='number'
          className='w-full form-input'
        />
      </FormGroup>
      <FormGroup label='Description'>
        <Textarea
          className='w-full form-input'
        />
      </FormGroup>
    </div>
  );
};
