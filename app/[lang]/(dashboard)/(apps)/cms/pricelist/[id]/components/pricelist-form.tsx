'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormFooter from '@/components/form-footer';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { toast } from 'react-hot-toast';
import { PriceList } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Separator } from '@/components/ui/separator';
import DocumentUpload from '@/components/ui/document-upload';

import {
  PriceListFormValues,
  pricelistFormSchema,
} from '@/utils/schema/pricelist.form.schema';

import { pricelistdefaultValues } from '@/utils/defaultvalues/pricelist.defaultValue';

import { Switch } from '@/components/ui/switch';

interface PriceListFormProps {
  initialPriceListData: PriceList | null;
}

export const PriceListForm: React.FC<PriceListFormProps> = ({
  initialPriceListData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  // const [contents, setContents] = useState(initialPriceListData?.fileURL ?? []);

  const id = initialPriceListData?.id;

  const actionMessage = initialPriceListData
    ? 'PriceList has changed successfully.'
    : 'New PriceList has been added successfully.';

  const form = useForm<PriceListFormValues>({
    resolver: zodResolver(pricelistFormSchema),
    defaultValues: pricelistdefaultValues(
      initialPriceListData ?? {
        name: '',
        fileURL: '',
        remarks: '',
        iStatus: true,
        iShowedStatus: false,
      }
    ),
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/cms/pricelist/pricelist-list');
  };

  const onSubmit = async (data: PriceListFormValues) => {
    try {
      setLoading(true);
      if (initialPriceListData) {
        await axios.patch(`/api/cms/pricelists/${params?.id}`, data);
      } else {
        await axios.post(`/api/cms/pricelists`, data);
      }
      router.push('/cms/pricelist/pricelist-list');
      router.refresh();
      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/cms/pricelists/${id}`);
      router.refresh();
      setLoading(false);
      toast.success('Content has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className='w-full flex flex-col gap-6 drop-shadow-md justify-center px-4'> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          {/* <div className='w-[1200px] h-[675px] flex items-center justify-center'> */}
          <div className='w-full flex items-center justify-center'>
            <FormField
              control={form.control}
              name='fileURL'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <DocumentUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(fileURL) => {
                        handleImageRemove(
                          extractPublicIdFromCloudinaryUrl(fileURL) ?? ''
                        );
                        const newValue = Array.isArray(field.value)
                          ? field.value.filter(
                              (value: { fileURL: string }) =>
                                value.fileURL !== fileURL
                            )
                          : [];
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator />

          <div className='grid grid-cols-2 gap-4 py-2'>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Name'
                        value={field.value ?? ''}
                        onChange={field.onChange}
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
                          This pricelist will be shown in the website
                        </span>
                      ) : (
                        <span className='text-black'>
                          This pricelist will not be shown in the website
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='iShowedStatus'
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
                        <span className='text-red text-semibold'>
                          Displayed in the website
                        </span>
                      ) : (
                        <span className='text-green'>
                          Not displayed in the website
                        </span>
                      )}{' '}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <span className='text-white'>
                          This billboard will be shown in the website
                        </span>
                      ) : (
                        <span className='text-black'>
                          This billboard will not be shown in the website
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
      {/* </div> */}
    </>
  );
};
function extractPublicIdFromCloudinaryUrl(imageURL: string): string | null {
  const parts = imageURL.split('/');
  const fileName = parts.pop(); // Gets "myimage.jpg"
  if (typeof fileName === 'string') {
    const id = fileName.split('.')[0];
    return id; // Return the extracted id
  } else {
    console.error('fileName is not a string');
    return null; // Return null or handle the error as needed
  }
}
