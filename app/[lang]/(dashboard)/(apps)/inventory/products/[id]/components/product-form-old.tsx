'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormFooter from '@/components/form-footer';

import { toast } from 'react-hot-toast';
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

import { Input } from '@/components/ui/input_T';
import { Button } from '@/components/ui/button_T';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form_T';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select_T';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';
import FormGroup from './form-group';
import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';
import { defaultValues } from './form-utils';

// const formSchema = z.object({
//   id: z.string().optional().nullable(),
//   category_id: z.string().min(1).optional(),
//   subCategory_id: z.string().min(1).optional(),
//   brand_id: z.string().min(1).optional(),
//   catalog_id: z.string().min(1).optional(),
//   name: z.string().min(5),
//   uom_id: z.string().min(1).optional(),
//   registered_id: z.string().min(5).or(z.literal('')).optional().nullable(),
//   remarks: z.string().min(5).or(z.literal('')).optional().nullable(),
//   iStatus: z.boolean().default(false).optional(),
//   ecatalog_URL: z.string().min(5).or(z.literal('')).optional().nullable(),
//   tkdn_pctg: z.coerce.number().min(0),
//   bmp_pctg: z.coerce.number().min(0),
//   images: z.object({ imageURL: z.string() }).array().optional(),
// });

type ProductFormValues = z.infer<typeof productFormSchema>;

// type Products = {
//   id: string| null;
//   catalog_id: string | null;
//   category_id: string | null;
//   subCategory_id: string | null;
//   brand_id: string | null;
//   name: string | null;
//   uom_id: string | null;
//   registered_id: string | null;
//   remarks: string| null;
//   iStatus: boolean | null;
//   ecatalog_URL: string | null;
//   tkdn_pctg: number | null
//   bmp_pctg: number | null
//   // other properties...
// };

// type Category = {
//   id: string | null;
//   name: string | null;
//   // other properties...
// };

// type SubCategory = {
//   id: string | null;
//   name: string | null;
//   category_id: string | null;
//   // other properties...
// };


// type Brand = {
//   type:boolean
//   id: string;
//   name: string;
//   iStatus:number
//   remarks:string
//   company:string
//   branch:string
//   createdBy:string
//   UpdateBy:string
//   createdAt :Date()
//   updatedAt:Date()
//   // other properties...
// };

// type Uom = {
//   id: string;
//   name: string;
//   iStatus:number
//   remarks:string

//   // other properties...
// };



interface ProductFormProps {
  initialData:
   Products
    | null;
  categories: Categories[]
  subCategories: SubCategories[]
  brands: Brands[]
  uoms: Uoms[]
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const ProductFormOld: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  subCategories,
  brands,
  uoms,
  loading,
  setLoading,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  const description = initialData
    ? `Change Product ${initialData.id}-> ${initialData.name}`
    : 'Add New Product';
  const toastMessage = initialData
    ? 'Product has changed successfully.'
    : 'New Product has been added successfully.';
  const action = initialData ? 'Save Changes' : 'Save New Product';

  // const defaultValues = initialData
  //   ? {
  //       ...initialData,
  //       name: initialData.name || undefined,
  //     }
  //   : {
  //       id: '',
  //       images: [],
  //       category_id: '',
  //       subCategory_id: '',
  //       brand_id: '',
  //       catalog_id: '',
  //       registered_id: '',
  //       name: '',
  //       uom_id: '',
  //       iStatus: false,
  //       tkdn_pctg: 0,
  //       bmp_pctg: 0,
  //       ecatalog_URL: '',
  //       remarks: '',
  //       base: '',
  //       construction: '',
  //     };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...defaultValues(initialData),
    },
  });

  const handleSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-8 w-full'
        >
          <div className='w-full flex-col gap-4 justify-end'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value?.map(
                        (ProductImages) => ProductImages.imageURL
                      )}
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-4'>
            <div className='w-1/2 flex-col gap-4'>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Id</FormLabel>
                    <FormControl>
                      <Input disabled placeholder='Id' {...field} />
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

            <div className='w-1/2 flex-col gap-4'>
              <FormField
                control={form.control}
                name='catalog_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catalog</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Catalog'
                        {...field}
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

            <div className='w-1/2 flex-col gap-4'>
              <FormField
                control={form.control}
                name='registered_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Input registration number'
                        {...field}
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
          </div>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Input product name'
                    {...field}
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

          <div className='flex gap-4 pb-5'>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='category_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Select a category'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='subCategory_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Subcategory'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.name && (
                        <FormMessage>
                          {form.formState.errors.name.message}
                        </FormMessage>
                      )}{' '}
                      <SelectContent>
                        {subCategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.id}
                          >
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='brand_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Brand'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.name && (
                        <FormMessage>
                          {form.formState.errors.name.message}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='uom_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uom</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Uom'
                          />
                        </SelectTrigger>
                      </FormControl>
                      {form.formState.errors.name && (
                        <FormMessage>
                          {form.formState.errors.name.message}
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                      disabled={loading}
                      placeholder='https://ekatalog'
                      {...field}
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

          <div>
            <FormField
              control={form.control}
              name='remarks'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      height='100px'
                      disabled={loading}
                      placeholder='Type here to add remarks'
                      {...field}
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

            <FormField
              control={form.control}
              name='iStatus'
              render={({ field }) => (
                <FormItem
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 justify-self-end ${
                    field.value ? 'bg-slate-700' : 'bg-green-600'
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
                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}{' '}
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
                        <span className='text-slate-700'>
                          This product will not be shown during transaction
                          input
                        </span>
                      ) : (
                        <span className='text-primay-600'>
                          This product will be shown during transaction input
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* <div className='flex justify-end space-x-4'>
            <Button
              onClick={() => router.push('/inventory/products/product-list')}
            >
              Back
            </Button>
            <Button disabled={loading} type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div> */}
        </form>
      </Form>
    </>
  );
};
