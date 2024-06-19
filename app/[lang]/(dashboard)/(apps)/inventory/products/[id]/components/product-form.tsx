'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Heading } from '@/components/ui/heading';

import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';

import { toast } from 'react-hot-toast';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
  Products,
  Categories,
  SubCategories,
  Brands,
  Uoms,
  ProductImages,
  ProductSpecs,
} from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import ImageCollection from '@/components/ui/images-collection';
import { Checkbox } from '@/components/ui/checkbox';

import { Separator } from '@/components/ui/separator';
import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import { defaultValues } from '@/utils/defaultvalues/materialproduct..defaultValues';
import {
  MaterialProductFormValues,
  materialproductFormSchema,
} from '@/utils/schema/materialproduct.form.schema';

interface ProductFormProps {
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

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  subCategories,
  brands,
  uoms,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Product' : 'Add New Product';
  const description = initialData
    ? `Change Product ${initialData.id}-> ${initialData.name}`
    : 'Add New Product';
  const toastMessage = initialData
    ? 'Product has changed successfully.'
    : 'New Product has been added successfully.';
  const action = initialData ? 'Save Changes' : 'Save New Product';

  const pageHeader = {
    title: initialData ? 'Edit Product' : 'New Product',

    breadcrumb: [
      {
        name: 'Inventory',
      },
      {
        name: 'Products',
        href: routes.inventory.products,
      },
      {
        name: initialData ? 'Edit Product' : 'New Product',
      },
    ],
  };

  // const methods = useForm<MaterialProductFormValues>({
  //   resolver: zodResolver(materialproductFormSchema),
  //   defaultValues: {
  //     ...defaultValues(...initialData ?? {}),
  //   },
  // });

  const form = useForm<MaterialProductFormValues>({
    resolver: zodResolver(materialproductFormSchema),
    defaultValues: {
      ...initialData,
      images: [],
      id: initialData?.id,
      name: initialData?.name ?? '',
      catalog_id: initialData?.catalog_id ?? '',
      registered_id: initialData?.registered_id ?? '',
      category_id: initialData?.category_id ?? '',
      subCategory_id: initialData?.subCategory_id ?? '',
      brand_id: initialData?.brand_id ?? '',
      uom_id: initialData?.uom_id ?? '',
      tkdn_pctg: initialData?.tkdn_pctg ?? 0,
      bmp_pctg: initialData?.bmp_pctg ?? 0,
      ecatalog_URL: initialData?.ecatalog_URL ?? '',
      iStatus: initialData?.iStatus ?? false,
      remarks: initialData?.remarks || undefined,
      slug: initialData?.slug || undefined,
      isMaterial: initialData?.isMaterial ?? true,
      iShowedStatus: initialData?.iShowedStatus ?? false,
      // createdBy: initialData?.createdBy || undefined,
      // createdAt: initialData?.createdAt || undefined,
      // updatedBy: initialData?.updatedBy || undefined,
      // updatedAt: initialData?.updatedAt || undefined,
      // company: initialData?.company || undefined,
      // branch: initialData?.branch || undefined,
    },
  });

  const onSubmit = async (data: MaterialProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${params.id}`, data);
      } else {
        console.log('add new product', data);
        await axios.post(`/api/inventory/products`, data);
      }
      router.push('/inventory/products/product-list');
      router.refresh();
      toast.success(toastMessage);
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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          {/* <div className='w-full flex items-center'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <ImageCollection
                      value={
                        field.value?.map(
                          (ProductImages) => ProductImages.imageURL
                        ) || []
                      } // Provide a default value of an empty array
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator /> */}

          <div className='grid grid-cols-3 gap-4 py-2'>
            <div>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Id</FormLabel>
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
                        disabled
                        placeholder='Input catalog here'
                        value={field.value ?? ''}
                        onChange={field.onChange}
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
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder='Input registration id here'
                        value={field.value ?? ''}
                        onChange={field.onChange}
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
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <ProductNameExist
                      currentValue={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
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
          </div>

          <div className='grid grid-cols-3 gap-4 py-2'>
            <div>
              <FormField
                control={form.control}
                name='category_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                      defaultValue={field.value ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Select a category'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.category_id && (
                        <FormMessage>
                          {form.formState.errors.category_id.message}
                        </FormMessage>
                      )}{' '}
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                name='brand_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
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
                            placeholder='Brand'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.brand_id && (
                        <FormMessage>
                          {form.formState.errors.brand_id.message}
                        </FormMessage>
                      )}{' '}
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
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
                            placeholder='Uom'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.uom_id && (
                        <FormMessage>
                          {form.formState.errors.uom_id.message}
                        </FormMessage>
                      )}{' '}
                      <SelectContent>
                        {uoms.map((uom) => (
                          <SelectItem key={uom.id} value={uom.id}>
                            {uom.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='tkdn_pctg'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Components (%)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        disabled={loading}
                        placeholder='99.99'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name='ecatalog_URL'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>eCatalog Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder='http://ekatalog'
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
              name='remarks'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      disabled={loading}
                      placeholder='Type here to add remarks'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='iStatus'
              render={({ field }) => (
                <FormItem
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 justify-self-end ${
                    field.value
                      ? 'bg-slate-400 text-black'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {' '}
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>
                          Non Active
                        </span>
                      ) : (
                        <span className='text-green'>Active</span>
                      )}{' '}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <span className='text-black'>
                          This product will not be shown during transaction
                          input
                        </span>
                      ) : (
                        <span className='text-white'>
                          This product will be shown during transaction input
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end space-x-4'>
            <Button
              onClick={() => router.push('/inventory/products/product-list')}
            >
              Back
            </Button>
            <Button disabled={loading} type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>
      {/* </FormGroup> */}
    </>
  );
};
