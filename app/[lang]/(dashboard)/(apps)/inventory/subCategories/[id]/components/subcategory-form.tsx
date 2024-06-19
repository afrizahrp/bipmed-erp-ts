'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/page-header';

import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { Loader2 } from 'lucide-react';

import { Categories, SubCategories } from '@prisma/client';
import SubCategoryNameExist from '@/components/nameExistChecking/inventory/subCategoryNameExist';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  SubCategoryFormValues,
  subCategoryFormSchema,
} from '@/utils/schema/subcategory.form.schema';
// const formSchema = z.object({
//   id: z.string().min(1).nullable(),
//   category_id: z.string().min(1),
//   name: z.string().min(3).or(z.literal('')),
//   remarks: z.string().min(5).or(z.literal('')).nullable(),
//   iStatus: z.boolean().default(false).optional(),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
//   createdBy: z.string().optional().nullable(),
//   updatedBy: z.string().optional().nullable(),
//   company: z.string().optional(),
//   branch: z.string().optional(),
// });

// type SubCategoryFormValues = z.infer<typeof formSchema>;

interface SubCategoryFormProps {
  initialData: SubCategories | undefined;
  categories: Categories[];
}

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  // const [searchTerms, setSearchTerms] = useState('');

  const title = initialData ? 'Edit SubCategory' : 'Add New SubCategory';
  const description = initialData
    ? `Change SubCategory ${initialData.id}-> ${initialData.name}`
    : 'Add New SubCategory';
  const toastMessage = initialData
    ? 'SubCategory has changed successfully.'
    : 'New SubCategory has been added successfully.';
  const action = initialData ? 'Save Changes' : 'Save New SubCategory';

  const pageHeader = {
    title: initialData ? 'Edit SubCategory' : 'New SubCategory',

    breadcrumb: [
      {
        name: 'Inventory',
      },
      {
        name: 'SubCategories',
        href: routes.inventory.subcategories,
      },
      {
        name: initialData ? 'Edit SubCategory' : 'New SubCategory',
      },
    ],
  };

  // const defaultValues = initialData
  //   ? {
  //       ...initialData,
  //       category_id: initialData.category_id || '',
  //       name: initialData.name || '',
  //       iStatus: initialData.iStatus || false,
  //       remarks: initialData.remarks || undefined,
  //       createdAt: initialData.createdAt || new Date(),
  //       updatedAt: initialData.updatedAt || new Date(),
  //       createdBy: initialData.createdBy || '',
  //       updatedBy: initialData.updatedBy || '',
  //       company: initialData.company || '',
  //       branch: initialData.branch || '',
  //     }
  //   : {
  //       id: '',
  //       name: '',
  //       iStatus: false,
  //       remarks: '',
  //       category_id: '',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       createdBy: '',
  //       updatedBy: '',
  //       company: '',
  //       branch: '',
  //     };
  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: {
      ...initialData,
      id: initialData?.id,
      name: initialData?.name || undefined,
      remarks: initialData?.remarks || undefined,
      iStatus: initialData?.iStatus || undefined,
      // createdBy: initialData?.createdBy || undefined,
      // createdAt: initialData?.createdAt || undefined,
      // updatedBy: initialData?.updatedBy || undefined,
      // updatedAt: initialData?.updatedAt || undefined,
      // company: initialData?.company || undefined,
      // branch: initialData?.branch || undefined,
    },
  });
  const onSubmit = async (data: SubCategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/categories/${params.id}`, data);
      } else {
        await axios.post(`/api/inventory/categories`, data);
      }
      router.push('/inventory/categories/category-list');
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-2 gap-4 py-2'>
            <div>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SubCategory Id</FormLabel>
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
          </div>

          <div className='grid grid-cols-4 gap-4 py-2'>
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
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value ?? ''}
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
          </div>

          <div className='w-3/4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <SubCategoryNameExist
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

          <div>
            <FormField
              control={form.control}
              name='remarks'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      placeholder='Type here to add remarks'
                      disabled={loading}
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
                      disabled={loading}
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
                          This category will not be shown during transaction
                          input
                        </span>
                      ) : (
                        <span className='text-white'>
                          This category will be shown during transaction input
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
              onClick={(event) => {
                event.stopPropagation();
                router.push('/inventory/categories/category-list');
              }}
            >
              Back
            </Button>
            <Button disabled={loading} className='ml-auto' type='submit'>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {action}{' '}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
