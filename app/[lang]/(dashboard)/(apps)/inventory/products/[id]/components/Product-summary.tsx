import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import cn from '@/utils/class-names';
import FormGroup from './form-group';

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title='Summary'
      description='Edit your product description and necessary information from here'
      className={cn(className)}
    >
      <Input
        label='Title'
        placeholder='Product title'
        {...register('title')}
        error={errors.title?.message as string}
      />
      <Input
        label='SKU'
        placeholder='Product sku'
        {...register('sku')}
        error={errors.sku?.message as string}
      />

      <Controller
        name='type'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
                <SelectItem value='blueberry'>Blueberry</SelectItem>
                <SelectItem value='grapes'>Grapes</SelectItem>
                <SelectItem value='pineapple'>Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </FormGroup>
  );
}
