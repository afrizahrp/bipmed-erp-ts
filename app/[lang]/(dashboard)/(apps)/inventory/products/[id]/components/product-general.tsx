import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input_T';
import { Label } from '@/components/ui/Label_T';
import { Textarea } from '@/components/ui/text-area';
import { Checkbox } from '@/components/ui/checkbox_T';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select_T';

import { CleaveInput } from '@/components/ui/cleave';

type Categories = {
  id: string;
  name: string;
};

type SubCategories = {
  id: string;
  name: string;
  category_id: string;
};
type Brands = {
  id: string;
  name: string;
};
type Uoms = {
  id: string;
  name: string;
};

interface ProductGeneralProps {
  categories: Categories[];
  subCategories: SubCategories[];
  brands: Brands[];
  uoms: Uoms[];
  className?: string;
  loading: boolean;
  // setLoading: (loading: boolean) => void;
}

// export const ProductGeneral: React.FC<ProductGeneralProps> = ({
export default function ProductGeneral({
  categories = [],
  subCategories = [],
  brands = [],
  uoms = [],
  className = '',
  loading,
  // setLoading,
}: ProductGeneralProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedCategoryId = watch('category_id');
  const checkboxValue = watch('iStatus');

  useEffect(() => {
    const selectedSubCategory = watch('subCategory_id');
    const subCategoryBelongsToCategory =
      subCategories &&
      subCategories.some(
        (subCategory) =>
          subCategory.id === selectedSubCategory &&
          subCategory.category_id === selectedCategoryId
      );

    if (!subCategoryBelongsToCategory) {
      setValue('subCategory_id', null);
    }
  }, [selectedCategoryId, setValue, watch, subCategories]);

  return (
    <>
      <div className='grid grid-cols-5 gap-4 py-2'>
        <div>
          <Label>Product Id</Label>
          <Input
            disabled
            {...register('id')}
            error={errors.id?.message as string}
            className='border border-gray-600 dark:text-slate-2 dark:bg-gray-8 bg-gray-200 text-center dark:text-blue-50'
          />
        </div>

        <div>
          <Label>Catalog Id</Label>
          <Input
            disabled={loading}
            placeholder='Catalog Id'
            {...register('catalog_id')}
            error={errors.catalog_id?.message as string}
          />
        </div>

        <div>
          <Label>Registration Id</Label>
          <Input
            disabled={loading}
            placeholder='Registration Id'
            {...register('registered_id')}
            error={errors.registered_id?.message as string}
          />
        </div>

        <div>
          <Label>Category</Label>
          <Controller
            name='category_id'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                disabled={loading}
                onValueChange={onChange}
                value={value}
                defaultValue={value}
              >
                <SelectTrigger>
                  <SelectValue
                    defaultValue={value}
                    placeholder='Select Category'
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label>Subcategory</Label>
          <Controller
            name='subCategory_id'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                disabled={loading}
                onValueChange={onChange}
                value={value}
                defaultValue={value}
              >
                <SelectTrigger>
                  <SelectValue
                    defaultValue={value}
                    placeholder='Select Sub Category'
                  />
                </SelectTrigger>
                <SelectContent>
                  {subCategories
                    ?.filter(
                      (subCategory: SubCategories) =>
                        subCategory.category_id === selectedCategoryId
                    )
                    .map((subCategory: SubCategories) => (
                      <SelectItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 py-7'>
        <div className='col-span-8'>
          <Label>Product Name</Label>

          <Input
            disabled={loading}
            placeholder='Product Name'
            {...register('name')}
            error={errors.name?.message as string}
            className='dark:text-slate-2 dark:bg-gray-8  font-semibold dark:text-blue-50'
          />
        </div>

        <div className='col-span-2 text-right'>
          <Label className='w-full text-right'>TKDN (%)</Label>
          <Controller
            name='tkdn_pctg'
            control={control}
            render={({ field: { value } }) => (
              <CleaveInput
                options={{
                  delimiters: ['.'],
                  blocks: [2, 2],
                  uppercase: true,
                }}
                placeholder='99.99'
                value={value}
                className='text-right'
                onChange={(e) => {
                  setValue('tkdn_pctg', e.target.value);
                }}
              />
            )}
          />
        </div>

        <div className='col-span-2 text-right'>
          <Label className='text-right'>BMP (%)</Label>

          <Controller
            name='bmp_pctg'
            control={control}
            render={({ field: { value } }) => (
              <CleaveInput
                options={{
                  delimiters: ['.'],
                  blocks: [2, 2],
                  uppercase: true,
                }}
                placeholder='99.99'
                value={value}
                className='text-right'
                onChange={(e) => {
                  setValue('bmp_pctg', e.target.value);
                }}
              />
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 py-5'>
        <div className='col-span-2'>
          <Label>Brands</Label>
          <Controller
            name='brand_id'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                disabled={loading}
                onValueChange={onChange}
                value={value}
                defaultValue={value}
              >
                <SelectTrigger>
                  <SelectValue defaultValue={value} placeholder='BIP MED' />
                </SelectTrigger>
                <SelectContent>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className='col-span-2'>
          <Label>UOM</Label>

          <Controller
            name='uom_id'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                disabled={loading}
                onValueChange={onChange}
                value={value}
                defaultValue={value}
              >
                <SelectTrigger>
                  <SelectValue defaultValue={value} placeholder='UNIT' />
                </SelectTrigger>
                <SelectContent>
                  {uoms?.map((uom) => (
                    <SelectItem key={uom.id} value={uom.id}>
                      {uom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className='col-span-8'>
          <Label>eCatalog link</Label>
          <Input
            disabled={loading}
            placeholder='eCatalog URL'
            {...register('ecatalog_URL')}
            error={errors.ecatalog_URL?.message as string}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 py-5'>
        <div className='col-span-1'>
          <Textarea
            disabled={loading}
            placeholder='Remarks'
            {...register('remarks')}
            error={errors.remarks?.message as string}
            className='col-span-2'
          />
        </div>
      </div>

      <div>
        <Controller
          name='iStatus'
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild> */}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  disabled={loading}
                  value={value}
                  checked={value}
                  onCheckedChange={onChange}
                  className='col-span-full'
                />

                {/* <Label>Active Status</Label> */}
                <label
                  htmlFor='activestatus'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {value ? ' Non Active' : ' Active'}{' '}
                </label>
              </div>

              {/* </TooltipTrigger> */}
              {/* <TooltipContent
                    sideOffset={4}
                    color={value ? 'red' : 'green'}
                  > */}
              {/* {value === true
                      ? 'This product will NOT be shown during transaction input'
                      : 'This product will be SHOWN during transaction input'} */}
              {/* </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}

              {/* {value === true ? (
                <span className='text-slate-700'>
                  This product will not be shown during transaction input
                </span>
              ) : (
                <span className='text-primary-600'>
                  This product will be shown during transaction input
                </span>
              )}

              <label
                htmlFor='activestatus'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {value ? ' Non Active' : ' Active'}{' '}
              </label> */}
            </>
          )}
        />
      </div>
    </>
  );
}
