'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/ui/quill-loader';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />,
});

import { ProductDescs } from '@prisma/client';

import { useParams } from 'next/navigation';

interface ProductDescsFormProps {
  initialProductDescsData: ProductDescs | null;
  className?: string;
}

export const ProductDescsForm: React.FC<ProductDescsFormProps> = ({
  initialProductDescsData,
  className,
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
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormGroup
        title='Product Descriptions'
        description='Edit product descriptions from here'
        className={cn(className)}
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
          <Controller
            control={control}
            name='descriptions'
            render={(field) => (
              <QuillEditor
                value={watch('descriptions')} // Use watch to get the value
                onChange={(value) => setValue('descriptions', value)}
                label='Body'
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            )}
          />
        </div>

        <div className='pt-2'>
          <Controller
            control={control}
            name='features'
            render={(field) => (
              <QuillEditor
                value={watch('features')} // Use watch to get the value
                onChange={(value) => setValue('features', value)}
                label='Features'
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            )}
          />
        </div>

        <div className='pt-2'>
          <Controller
            control={control}
            name='footers'
            render={(field) => (
              <QuillEditor
                value={watch('footers')} // Use watch to get the value
                onChange={(value) => setValue('footers', value)}
                label='Footer'
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            )}
          />
        </div>
        {/* </div> */}
      </FormGroup>
    </>
  );
};
