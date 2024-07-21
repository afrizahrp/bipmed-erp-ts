'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS

import { ProductDescs } from '@prisma/client';

import { useParams } from 'next/navigation';

interface ProductDescsFormProps {
  initialProductDescsData: ProductDescs | null;
}

export const ProductDescsForm: React.FC<ProductDescsFormProps> = ({
  initialProductDescsData,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [descriptions, setDescriptions] = useState(
    initialProductDescsData?.descriptions || ''
  );

  const [features, setFeatures] = useState(
    initialProductDescsData?.features || ''
  );

  const [footers, setFooters] = useState(
    initialProductDescsData?.footers || ''
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormGroup
        title='Product Descriptions'
        description='Edit product product descriptions from here'
      >
        {/* <div className='grid grid-cols-4 gap-4 py-2'> */}
        <div>
          <Label>Title</Label>
          <Input
            id='title'
            placeholder=' '
            {...register('title')}
            className={cn('peer  font-bold text-md', {
              'border-destructive': errors.title,
            })}
          />
          {errors.title && (
            <div className='text-destructive'>
              {errors.title.message?.toString()}
            </div>
          )}
        </div>

        <div className='pt-2'>
          <Label>Body</Label>
          <SimpleMDE
            {...register('descriptions')}
            value={descriptions}
            onChange={(value) => setValue('descriptions', value)}
            aria-disabled={false}
            placeholder='Input product descriptions here'
            className={cn('w-full', {
              'border-destructive focus:border-destructive':
                errors.descriptions,
            })}
          />
        </div>

        <div className='pt-2'>
          <Label>Features</Label>
          <SimpleMDE
            {...register('features')}
            value={features}
            onChange={(value) => setValue('features', value)}
            aria-disabled={false}
            placeholder='Input product features here'
            className={cn('w-full', {
              'border-destructive focus:border-destructive': errors.features,
            })}
          />
        </div>

        <div className='pt-2'>
          <Label>Footers</Label>
          <SimpleMDE
            {...register('footers')}
            value={footers}
            onChange={(value) => setValue('footers', value)}
            aria-disabled={false}
            placeholder='Input description footers here'
            className={cn('w-full', {
              'border-destructive focus:border-destructive': errors.footers,
            })}
          />
        </div>
        {/* </div> */}
      </FormGroup>
    </>
  );
};
