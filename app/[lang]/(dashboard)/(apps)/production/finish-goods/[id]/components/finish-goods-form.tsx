'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { toast } from 'react-hot-toast';

import {
  Products,
  SubCategories,
  ProductImages,
  Categories,
  Brands,
  Uoms,
} from '@prisma/client';

import { useParams, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import {
  SearchColumnProductCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';
import { Switch } from '@/components/ui/switch';
// import { Checkbox } from '@/components/ui/checkbox';

import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';
import ImageUpload from '@/components/ui/image-upload';
import FormGroup from '@/components/form-group';

interface FinishGoodsFormProps {
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
  roducts: Products;
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
  const id = initialData?.id;

  const actionMessage = initialData
    ? 'Finish Goods has changed successfully.'
    : 'New Finish Goods has been added successfully.';

  const pageHeader = {
    title: initialData ? 'Edit Finish Goods' : 'New Finish Goods',

    breadcrumb: [
      {
        name: 'Dashboard',
        href: routes.production.dashboard,
      },
      {
        name: 'List',
        href: routes.production.products,
      },
      {
        name: initialData ? 'Finish Goods' : 'Finish Goods',
      },
    ],
  };

  const defaultValues = initialData
    ? {
        ...initialData,
        images: initialData?.images || [],
        catalog_id: initialData?.catalog_id ?? '',
        registered_id: initialData?.registered_id ?? '',
        id: initialData?.id ?? '',
        name: initialData?.name ?? '',
        category_id: initialData?.category_id ?? '',
        subCategory_id: initialData?.subCategory_id ?? '',
        brand_id: initialData?.brand_id ?? '',
        uom_id: initialData?.uom_id ?? '',
        tkdn_pctg: initialData?.tkdn_pctg ?? 0,
        bmp_pctg: initialData?.bmp_pctg ?? 0,
        ecatalog_URL: initialData?.ecatalog_URL ?? '',
        iStatus: initialData?.iStatus ?? true,
        remarks: initialData?.remarks || undefined,
        isMaterial: initialData?.isMaterial ?? false,
        slug: initialData?.slug ?? '',
      }
    : {
        images: [],
        catalog_id: undefined,
        registered_id: undefined,
        id: '',
        name: '',
        category_id: '',
        subCategory_id: '',
        brand_id: '',
        uom_id: '',
        tkdn_pctg: 0,
        bmp_pctg: 0,
        ecatalog_URL: '',
        iStatus: true,
        remarks: '',
        isMaterial: false,
        slug: '',
        iShowedStatus: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/production/finish-goods/finish-goods-list');
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${params.id}`, data);
      } else {
        console.log('add new product', data);
        await axios.post(`/api/inventory/products`, data);
      }
      router.push('/production/finish-goods/finish-goods-list');
      router.refresh();
      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryId = form.watch('category_id');

  useEffect(() => {
    const selectedSubCategory = form.watch('subCategory_id');
    const subCategoryBelongsToCategory =
      subCategories &&
      subCategories.some(
        (subCategory) =>
          subCategory.id === selectedSubCategory &&
          subCategory.category_id === selectedCategoryId
      );

    if (!subCategoryBelongsToCategory) {
      form.setValue('subCategory_id', '');
    }
  }, [selectedCategoryId, form.setValue, form.watch, subCategories]);

  const onProductNameChange = (newCategoryName: string) => {
    setSearchTerms(newCategoryName);
  };

  return (
    <>
      <FormGroup
        title='General Product Information'
        description='Edit product general product information from here'
      >
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <div className='grid grid-cols-3 gap-4 py-2'>
              <div>
                <FormField
                  control={form.control}
                  name='id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Id</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder='Id'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='catalog_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catalog</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Input catalog here'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                      {form.formState.errors.catalog_id && (
                        <FormMessage>
                          {form.formState.errors.catalog_id.message}
                        </FormMessage>
                      )}{' '}
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='registered_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reg.No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Input registration id here'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                      {form.formState.errors.registered_id && (
                        <FormMessage>
                          {form.formState.errors.registered_id.message}
                        </FormMessage>
                      )}{' '}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='w-3/4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Input name here'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onProductNameChange(e.target.value); // Call the new handler
                        }}
                        className='font-bold'
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <FormMessage>
                        {form.formState.errors.name.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ProductNameExist
                currentValue={searchTerms}
                onChange={onProductNameChange}
              />
            </div>

            <div className='grid grid-cols-4 gap-4 py-3'>
              <div>
                <FormField
                  control={form.control}
                  name='category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <SearchColumnProductCategory
                        {...field}
                        currentValue={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='subCategory_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value ?? ''}
                        defaultValue={field.value ?? ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ?? ''}
                              placeholder='Subcategory'
                            />
                          </SelectTrigger>
                        </FormControl>
                        {form.formState.errors.subCategory_id && (
                          <FormMessage>
                            {form.formState.errors.subCategory_id.message}
                          </FormMessage>
                        )}{' '}
                        <SelectContent>
                          {subCategories
                            ?.filter(
                              (subCategory: SubCategories) =>
                                subCategory.category_id === selectedCategoryId
                            )
                            .map((subCategory: SubCategories) => (
                              <SelectItem
                                key={subCategory.id}
                                value={subCategory.id}
                              >
                                {subCategory.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='uom_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uom</FormLabel>
                      <SearchColumnUom
                        {...field}
                        currentValue={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='brand_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brands</FormLabel>
                      <SearchColumnBrand
                        {...field}
                        currentValue={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* <div className='flex-col gap-4'> */}
            <div className='grid grid-cols-4 gap-4 py-2'>
              <div className='col-span-1'>
                <FormField
                  control={form.control}
                  name='tkdn_pctg'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TKDN (%)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          placeholder='99.99'
                          {...field}
                          className='text-right'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-1'>
                <FormField
                  control={form.control}
                  name='bmp_pctg'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMP (%)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          disabled={loading}
                          placeholder='99.99'
                          {...field}
                          className='text-right'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='ecatalog_URL'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>eCatalog Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='http://ekatalog'
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* <FormFooter
            isLoading={loading}
            handleAltBtn={handleBack}
            submitBtnText={id ? 'Update' : 'Save'}
          /> */}
          </form>
        </Form>
      </FormGroup>
    </>
  );
};
