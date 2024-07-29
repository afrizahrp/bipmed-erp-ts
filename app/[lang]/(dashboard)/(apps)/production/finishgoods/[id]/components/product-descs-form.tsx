'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/ui/quill-loader';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

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

  const [benefit, setBenefit] = useState(
    initialProductDescsData?.benefit || ''
  );

  const {
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
        <div className='pt-2'>
          <Controller
            control={control}
            name='descriptions'
            render={(field) => (
              <QuillEditor
                value={watch('descriptions')} // Use watch to get the value
                onChange={(value) => setValue('descriptions', value)}
                label='Descriptions'
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            )}
          />
        </div>

        <div className='pt-2'>
          <Controller
            control={control}
            name='benefit'
            render={(field) => (
              <QuillEditor
                value={watch('benefit')} // Use watch to get the value
                onChange={(value) => setValue('benefit', value)}
                label='Benefits'
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            )}
          />
        </div>
      </FormGroup>
    </>
  );
};
