'use client';

// import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/page-header';

import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Loader2 } from 'lucide-react';

import { Categories, CategoryTypes } from '@prisma/client';
// import { Categories, CategoryTypes } from '@/types';

import CategoryNameExist from '@/components/nameExistChecking/inventory/categoryNameExist';
import { useParams, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormFooter from '@/components/form-footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';

import {
  CategoryFormValues,
  categoryFormSchema,
} from '@/utils/schema/category.form.schema';
// import { defaultValues } from '@/utils/defaultvalues/category.defaultValues';

interface CategoryFormProps {
  initialData?: Categories;
  categoryTypes: CategoryTypes[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  categoryTypes,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');

  const id = initialData?.id;

  const actionMessage = initialData
    ? 'Category has changed successfully.'
    : 'New Category has been added successfully.';

  const pageHeader = {
    title: initialData ? 'Edit Category' : 'New Category',
    breadcrumb: [
      {
        name: 'Dashboard',
        href: routes.inventory.dashboard,
      },
      {
        name: 'List',
        href: routes.inventory.categories,
      },
      {
        name: initialData ? 'Edit Category' : 'New Category',
      },
    ],
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      ...initialData,
      imageURL: initialData?.imageURL || undefined,
      id: initialData?.id ?? '',
      type: initialData?.type ?? '0',
      name: initialData?.name ?? '',
      href: initialData?.href ?? '',
      icon: initialData?.icon ?? '',
      slug: initialData?.slug ?? '',
      iShowedStatus: initialData?.iShowedStatus ?? true, // Not display in website
      remarks: initialData?.remarks ?? '',
      iStatus: initialData?.iStatus ?? false,
    },
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/inventory/categories/category-list');
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/categories/${params.id}`, data);
      } else {
        await axios.post(`/api/inventory/categories`, data);
      }
      router.push('/inventory/categories/category-list');
      router.refresh();
      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const onCategoryNameChange = (newCategoryName: string) => {
    setSearchTerms(newCategoryName);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='imageURL'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-4 gap-4 py-2'>
            <div>
              <FormField
                control={form.control}
                name={'id'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Id</FormLabel>
                    <FormControl>
                      <Input disabled placeholder='id' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
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
                            placeholder='Select type'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryTypes.map((_categoryType) => (
                          <SelectItem
                            key={_categoryType.id}
                            value={_categoryType.id}
                          >
                            {_categoryType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                <div>
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Input category name'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onCategoryNameChange(e.target.value); // Call the new handler
                        }}
                        className='font-bold'
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <FormMessage>
                        {form.formState.errors.name.message}
                      </FormMessage>
                    )}
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <CategoryNameExist
              currentValue={searchTerms}
              onChange={onCategoryNameChange}
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