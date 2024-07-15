'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { toast } from 'react-hot-toast';
import { useMediaQuery } from '@/hooks/use-media-query';

import {
  Products,
  SubCategories,
  ProductImages,
  Categories,
  Brands,
  Uoms,
} from '@prisma/client';

import { useParams, useRouter } from 'next/navigation';

import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import {
  SearchColumnProductCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';
import { Switch } from '@/components/ui/switch';
// import { Checkbox } from '@/components/ui/checkbox';

import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

interface FinishGoodsFormProps {
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
  categories: Categories[];
  subCategories: SubCategories[];
  brands: Brands[];
  uoms: Uoms[];
}

export const FinishGoodsForm: React.FC<FinishGoodsFormProps> = ({
  initialData,
  subCategories,
  categories,
  brands,
  uoms,
}) => {
  const params = useParams();
  const router = useRouter();

  const [searchTerms, setSearchTerms] = useState('');
  const [loading, setLoading] = useState(false);
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');

  const id = initialData?.id;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const onProductNameChange = (newCategoryName: string) => {
    setSearchTerms(newCategoryName);
  };

  return (
    <>
      <FormGroup
        title='General Product Information'
        description='Edit product general product information from here'
      >
        <div className='grid grid-cols-4 gap-4 py-2'>
          <div>
            <Label>Id</Label>
            <Input
              removeWrapper
              type='id'
              id='id'
              placeholder=' '
              disabled
              {...register('id')}
              className={cn('peer', {
                'border-destructive': errors.id,
              })}
            />
            {errors.id && (
              <div className='text-destructive'>
                {errors.id.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <Label>Catalog</Label>
            <Input
              removeWrapper
              type='catalog_id'
              id='catalog_id'
              placeholder=' '
              disabled={loading}
              {...register('catalog_id')}
              className={cn('peer', {
                'border-destructive': errors.catalog_id,
              })}
            />
            {errors.catalog_id && (
              <div className='text-destructive'>
                {errors.catalog_id.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <Label>Reg.No</Label>
            <Input
              removeWrapper
              type='registered_id'
              id='registered_id'
              placeholder=' '
              disabled={loading}
              {...register('registered_id')}
              className={cn('peer', {
                'border-destructive': errors.registered_id,
              })}
            />
            {errors.registered_id && (
              <div className='text-destructive'>
                {errors.registered_id.message?.toString()}
              </div>
            )}
          </div>
        </div>

        <div className='pt-2'>
          <Label>Name</Label>
          <Input
            removeWrapper
            type='name'
            id='name'
            placeholder=' '
            disabled={loading}
            {...register('name')}
            className={cn('peer', {
              'border-destructive': errors.name,
            })}
          />
          {errors.name && (
            <div className='text-destructive'>
              {errors.name.message?.toString()}
            </div>
          )}
        </div>
      </FormGroup>
    </>
  );
};
