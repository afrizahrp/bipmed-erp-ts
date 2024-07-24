'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useFormContext, Controller } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Switch } from '@/components/ui/switch';

import {
  Products,
  // SubCategories,
  // ProductImages,
  // Categories,
  // Brands,
  // Uoms,
} from '@prisma/client';

import { useParams, useRouter } from 'next/navigation';

// import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
// import { Switch } from '@/components/ui/switch';

import {
  SearchColumnProductCategory,
  SearchColumnSubSubCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';
import ImageCollection from '@/components/ui/images-collection';
import { Switch } from '@/components/ui/switch';

interface FinishGoodsFormProps {
  product_id: string;
  initialProductData: Products | null;
  className?: string;
  // categories: Categories[];
  // subCategories: SubCategories[];
  // brands: Brands[];
  // uoms: Uoms[];
}

export const FinishGoodsForm: React.FC<FinishGoodsFormProps> = ({
  product_id,
  initialProductData,
  className,

  // subCategories,
  // categories,
  // brands,
  // uoms,
}) => {
  const params = useParams();
  const router = useRouter();

  const [searchTerms, setSearchTerms] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(product_id);
  const [remarks, setRemarks] = useState(initialProductData?.remarks || '');

  // const id = product_id;

  // console.log('initialProductData', id);

  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setId(product_id);
  }, [product_id]);

  const selectedCategory_id = watch('category_id');

  // console.log('product_id', product_id);

  // const onProductNameChange = (newCategoryName: string) => {
  //   setSearchTerms(newCategoryName);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 0) {
      value = 0; // Ensure the value is not less than min
    }
    e.target.value = value.toString();
  };

  return (
    <>
      <FormGroup
        title='General Product Information'
        description='Edit product general product information from here'
        className={cn(className)}
      >
        <div style={{ display: 'none' }}>
          <ImageCollection value={[]} disabled={loading} />
        </div>

        <div className='grid grid-cols-3 gap-4 py-2'>
          <div style={{ display: 'none' }}>
            <Label>Id</Label>
            <Input
              id='id'
              value={id}
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
              id='catalog_id'
              placeholder=' '
              disabled={loading}
              {...register('catalog_id')}
              className={cn('peer font-semibold', {
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
            type='name'
            id='name'
            placeholder=' '
            disabled={loading}
            {...register('name')}
            className={cn('peer font-semibold', {
              'border-destructive': errors.name,
            })}
          />
          {errors.name && (
            <div className='text-destructive'>
              {errors.name.message?.toString()}
            </div>
          )}
        </div>

        <div className='pt-2'>
          <Label>eCatalog Link</Label>
          <Input
            id='ecatalog_URL'
            placeholder='http://ekatalog'
            disabled={loading}
            {...register('ecatalog_URL')}
            className={cn('peer', {
              'border-destructive': errors.ecatalog_URL,
            })}
          />
          {errors.ecatalog_URL && (
            <div className='text-destructive'>
              {errors.ecatalog_URL.message?.toString()}
            </div>
          )}
        </div>

        <div className='grid grid-cols-4 gap-4'>
          <div>
            <div className='col-span-4'>Category</div>
            <SearchColumnProductCategory
              currentValue={initialProductData?.category_id}
              onChange={(value) => {
                setValue('category_id', value);
              }}
              disabled={loading}
            />
            <Input
              removeWrapper
              type='hidden'
              id='category_id'
              {...register('category_id')}
            />
            {errors.category_id && (
              <div className='text-destructive'>
                {errors.category_id.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <SearchColumnSubSubCategory
              currentValue={initialProductData?.subCategory_id ?? ''}
              onChange={(value) => {
                setValue('subCategory_id', value);
              }}
              disabled={loading}
              category_id={selectedCategory_id}
            />
            <Input
              removeWrapper
              type='hidden'
              id='subCategory_id'
              {...register('subCategory_id')}
            />
          </div>

          <div>
            <div className='col-span-4'>Uom</div>
            <SearchColumnUom
              currentValue={initialProductData?.uom_id ?? ''}
              onChange={(value) => {
                setValue('uom_id', value);
              }}
              disabled={loading}
            />
            <Input
              removeWrapper
              type='hidden'
              id='uom_id'
              {...register('uom_id')}
            />
          </div>

          <div>
            <div className='col-span-4'>Brand</div>
            <SearchColumnBrand
              currentValue={initialProductData?.brand_id ?? ''}
              onChange={(value) => {
                setValue('brand_id', value);
              }}
              disabled={loading}
            />
            <Input
              removeWrapper
              type='hidden'
              id='brand_id'
              {...register('brand_id')}
            />
          </div>
        </div>
        <div className='flex justify-end w-full'>
          <div className='grid grid-cols-8 gap-2 py-2 align-right justify-end'>
            <div className='col-span-2'>
              <Label>TKDN</Label>
              <Controller
                control={control}
                name='tkdn_pctg'
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      min={0}
                      max={99.99}
                      step={1}
                      id='tkdn_pctg'
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className={cn('peer text-right justify-end', {
                        'border-destructive': errors.tkdn_pctg,
                      })}
                    />
                    <InputGroupText className='bg-slate-200'>%</InputGroupText>
                  </InputGroup>
                )}
              />
            </div>
            <div className='col-span-2'>
              <Label>BMP</Label>
              <Controller
                control={control}
                name='bmp_pctg'
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      min={0}
                      max={99.99}
                      step={1}
                      id='bmp_pctg'
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className={cn('peer text-right justify-end', {
                        'border-destructive': errors.bmp_pctg,
                      })}
                    />
                    <InputGroupText className='bg-slate-200'>%</InputGroupText>
                  </InputGroup>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Remarks</Label>
          <SimpleMDE
            {...register('remarks')}
            value={remarks}
            onChange={(value) => setValue('remarks', value)}
            aria-disabled={false}
            placeholder='Input remarks here'
            className={cn('w-full', {
              'border-destructive focus:border-destructive': errors.remarks,
            })}
          />
        </div>

        {/* <div>
          <Label>Active Status</Label>
        </div> */}
        <div>
          <Controller
            control={control}
            name='iStatus'
            render={(
              { field } // Destructure field to access its properties
            ) => (
              <>
                <label
                  htmlFor='iStatus'
                  className='block text-sm font-medium text-gray-700'
                >
                  Active Status
                </label>
                <Switch
                  id='iStatus'
                  checked={!!field.value}
                  // @ts-ignore
                  onCheckedChange={field.onChange}
                  disabled={loading}
                  style={{
                    backgroundColor: field.value ? 'green' : 'gray',
                  }}
                />
                <div>
                  {field.value ? (
                    <span className='text-red text-semibold'>Active</span>
                  ) : (
                    <span className='text-green'>Non Active</span>
                  )}
                </div>
                <div>
                  {field.value ? (
                    <span className='text-green  italic'>
                      It will be shown during transaction input
                    </span>
                  ) : (
                    <span className='text-gray italic'>
                      It will not be shown during transaction input
                    </span>
                  )}
                </div>
              </>
            )}
          />
        </div>
      </FormGroup>
    </>
  );
};
