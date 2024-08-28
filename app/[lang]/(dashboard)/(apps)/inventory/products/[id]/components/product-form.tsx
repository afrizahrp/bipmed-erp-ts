'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import usePageStore from '@/store/usePageStore'; // Import store Zustand

import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import {
  // SearchColumnProductCategory,
  SearchColumnCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';

import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';

import { productdefaultValues } from '@/utils/defaultvalues/product.defaultValues';

import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
// import { Checkbox } from '@/components/ui/checkbox';
// import ImageUpload from '@/components/ui/image-upload';
// import { routes } from '@/config/routes';

interface ProductFormProps {
  initialProductData:
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
  initialProductData,
  subCategories,
  categories,
  brands,
  uoms,
}) => {
  const params = useParams();
  const router = useRouter();
  const { currentPage } = usePageStore(); // ✅ Panggil usePageStore di tingkat atas

  const [searchTerms, setSearchTerms] = useState('');
  const [loading, setLoading] = useState(false);
  const id = initialProductData?.id;

  const actionMessage = initialProductData
    ? 'Product has changed successfully.'
    : 'New Product has been added successfully.';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productdefaultValues(
      initialProductData ?? {
        id: '',
        catalog_id: '',
        registered_id: '',
        name: '',
        category_id: '',
        uom_id: 'UNIT',
        brand_id: '1457',
        tkdn_pctg: 0,
        bmp_pctg: 0,
        ecatalog_URL: '',
        iStatus: true,
        remarks: '',
        slug: '',
        isMaterial: false,
        iShowedStatus: false,
      }
    ),
  });

  const navigateToSavedPage = () => {
    const page = currentPage || 1; // Default ke halaman 1 jika currentPage undefined
    const constructUrl = (page: number) => {
      const url = new URL(window.location.href);
      url.pathname = '/inventory/products/product-list';
      url.searchParams.set('page', page.toString());
      url.hash = ''; // Clear the fragment identifier
      return url.toString();
    };

    const constructedUrl = constructUrl(page);
    router.push(constructedUrl);
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(false);
    navigateToSavedPage();
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialProductData) {
        await axios.patch(`/api/inventory/products/${params?.id}`, data);
      } else {
        // console.log('add new product', data);
        await axios.post(`/api/inventory/products`, data);
      }
      router.push('/inventory/products/product-list');
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='w-full flex items-center justify-center'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    {/* <ImageUpload
                      value={field.value.map((image) => image.imageURL)}
                      disabled={loading}
                      onChange={(imageURL) =>
                        field.onChange([...field.value, { imageURL }])
                      }
                      onRemove={(imageURL) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.imageURL !== imageURL
                          ),
                        ])
                      }
                    /> */}

                    <ImageCollection
                      value={
                        field.value?.map(
                          (ProductImages) => ProductImages.imageURL
                        ) || []
                      }
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator />

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
                    <FormLabel>Registration Number</FormLabel>
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
                      placeholder='Input product name here'
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
                    <SearchColumnCategory
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
          <div className='grid grid-cols-6 gap-2 py-2'>
            <div className='col-span-1'>
              <FormField
                control={form.control}
                name='tkdn_pctg'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TKDN (%)</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <Input
                          type='number'
                          disabled={loading}
                          placeholder='99.99'
                          {...field}
                          className='text-right'
                        />
                        <InputGroupText className='bg-slate-200'>
                          %
                        </InputGroupText>
                      </InputGroup>
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
                    <FormLabel>BMP</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <Input
                          type='number'
                          disabled={loading}
                          placeholder='99.99'
                          {...field}
                          className='text-right'
                        />
                        <InputGroupText className='bg-slate-200'>
                          %
                        </InputGroupText>
                      </InputGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-4'>
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
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-400 text-black'
                  }`}
                >
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                      // disabled={loading}
                      style={{
                        backgroundColor: field.value ? 'green' : 'gray',
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>Active</span>
                      ) : (
                        <span className='text-green'>Non Active</span>
                      )}{' '}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <span className='text-white'>
                          This product will be shown during transaction input
                        </span>
                      ) : (
                        <span className='text-black'>
                          This product will not be shown during transaction
                          input
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormFooter
            isLoading={loading}
            handleAltBtn={handleBack}
            submitBtnText={id ? 'Update' : 'Save'}
          />
        </form>
      </Form>
    </>
  );
};
