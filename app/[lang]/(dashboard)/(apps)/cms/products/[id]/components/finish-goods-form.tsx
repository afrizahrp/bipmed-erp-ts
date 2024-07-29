'use client';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';

import {
  Products,
  Categories,
  SubCategories,
  Brands,
  Uoms,
} from '@prisma/client';

import ImageCollection from '@/components/ui/images-collection';
import { Textarea } from '@/components/ui/textarea';

interface FinishGoodsFormProps {
  product_id: string;
  initialProductData: Products | null;
  className?: string;
  categories: Categories[];
  subCategories: SubCategories[];
  uoms: Uoms[];
  brands: Brands[];
}

export const FinishGoodsForm: React.FC<FinishGoodsFormProps> = ({
  product_id,
  initialProductData,
  categories,
  subCategories,
  uoms,
  brands,
  className,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const idValue = watch('id');
  const catalogIdValue = watch('catalog_id');
  const registeredIdValue = watch('registered_id');
  const productNameValue = watch('name');
  const categoryValue = watch('category_id');
  const subCategoryValue = watch('subCategory_id');
  const uomValue = watch('uom_id');
  const brandValue = watch('brand_id');
  const tkdnValue = watch('tkdn_pctg');
  const bmpValue = watch('bmp_pctg');
  const ecatalogValue = watch('ecatalog_URL');
  const remarksValue = watch('remarks');

  const categoryName =
    ' ' + categories.find((category) => category.id === categoryValue)?.name;
  const subCategoryName =
    ' ' +
    subCategories.find((subCategory) => subCategory.id === subCategoryValue)
      ?.name;
  const uomName = ' ' + uoms.find((uom) => uom.id === uomValue)?.name;
  const brand_name =
    ' ' + brands.find((brand) => brand.id === brandValue)?.name;

  return (
    <>
      <FormGroup
        title='General Product Information'
        description='Edit product general product information from here'
        className={cn(className)}
      >
        <div style={{ display: 'none' }}>
          <ImageCollection value={[]} disabled />
        </div>

        {idValue && (
          <div className='grid grid-cols-3 gap-4 py-2'>
            <div>
              <Label>Id</Label>
              <Input
                id='id'
                placeholder=' '
                {...register('id')}
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive': errors.id,
                })}
              />
            </div>
            <div>
              <Label>Catalog</Label>
              <Input
                id='catalog_id'
                placeholder=' '
                {...register('catalog_id')}
                disabled
                className={cn('w-full font-semibold text-black', {
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
                {...register('registered_id')}
                disabled
                className={cn('peer font-semibold', {
                  'border-destructive': errors.registered_id,
                })}
              />
            </div>
          </div>
        )}

        {productNameValue && (
          <div className='pt-2'>
            <Label>Name</Label>
            <Input
              type='name'
              id='name'
              placeholder=' '
              {...register('name')}
              disabled
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
        )}

        <div className='pt-2'>
          <Label>eCatalog Link</Label>
          <Input
            id='ecatalog_URL'
            placeholder='http://ekatalog'
            {...register('ecatalog_URL')}
            // disabled
            className={cn('peer font-semibold text-sm', {
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
            <Label>{categoryName}</Label>
          </div>

          <div>
            <div className='col-span-4'>Subcategory</div>
            <Label>{subCategoryName}</Label>
          </div>

          <div>
            <div className='col-span-4'>Uom</div>
            <Label>{uomName}</Label>
          </div>

          <div>
            <div className='col-span-4'>Brand</div>
            <Label>{brand_name}</Label>
          </div>
        </div>

        <div className='grid grid-cols-6 gap-2 py-2 justify-end text-right w-full'>
          {/* Use empty divs for spacing if needed */}
          <div className='col-span-4'></div> {/* Adjust this for spacing */}
          <div className='col-span-1'>
            <Label>TKDN</Label>
            <InputGroup>
              <Input
                type='number'
                min={0}
                step={1}
                id='tkdn_pctg'
                placeholder=' '
                {...register('tkdn_pctg')}
                // disabled
                className='peer font-semibold text-sm text-right justify-end border-destructive'
              />
              <InputGroupText className='bg-slate-200'>%</InputGroupText>
            </InputGroup>
          </div>
          <div className='col-span-1'>
            <Label>BMP</Label>
            <InputGroup>
              <Input
                type='number'
                min={0}
                step={1}
                id='bmp_pctg'
                placeholder=' '
                {...register('bmp_pctg')}
                // disabled
                className='peer font-semibold text-sm text-right justify-end border-destructive'
              />
              <InputGroupText className='bg-slate-200'>%</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div>
          <Label>Remarks</Label>
          <Textarea
            {...register('remarks')}
            placeholder='Input remarks here'
            disabled
            className={cn('w-full', {
              'border-destructive focus:border-destructive': errors.remarks,
            })}
          />
        </div>
      </FormGroup>
    </>
  );
};
