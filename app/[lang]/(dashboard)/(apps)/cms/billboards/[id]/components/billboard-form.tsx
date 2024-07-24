'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormFooter from '@/components/form-footer';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { toast } from 'react-hot-toast';

import { Billboards, BillboardContents } from '@prisma/client';

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

// import ImageCollection from '@/components/ui/images-collection';
import BillboardVideoUpload from '@/components/ui/billboard-video-upload';
import BillboardImageUpload from '@/components/ui/billboard-image-upload';
import GalleryWithUpload from '@/components/ui/image-gallery-with-upload';

import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import {
  BillboardFormValues,
  billboardFormSchema,
} from '@/utils/schema/billboard.form.schema';
import { billboarddefaultValues } from '@/utils/defaultvalues/billboard.defaultValue';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';

interface BillboardFormProps {
  initialBillboardData:
    | (Billboards & {
        contents: BillboardContents[];
      })
    | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialBillboardData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState(
    initialBillboardData?.contents ?? []
  );

  const id = initialBillboardData?.id;

  const actionMessage = initialBillboardData
    ? 'Billboard has changed successfully.'
    : 'New Billboard has been added successfully.';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: billboarddefaultValues(
      initialBillboardData ?? {
        id: 0,
        contents: [],
        name: '',
        description: '',
        title: '',
        section: 0,
        isImage: true,
        isShowBtn: false,
        btnText: '',
        iStatus: true,
        iShowedStatus: false,
        remarks: '',
      }
    ),
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/cms/billboards/billboard-list');
  };

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialBillboardData) {
        await axios.patch(`/api/cms/billboards/${params.id}`, data);
      } else {
        await axios.post(`/api/cms/billboards`, data);
      }
      router.push('/cms/billboards/billboard-list');
      router.refresh();
      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = async (contentURL: string) => {
    try {
      setLoading(true);

      const contentId = extractPublicIdFromCloudinaryUrl(contentURL);

      console.log('deleting content', contentId);
      await axios.delete(`/api/cms/billboardContents/${contentId}`);

      setContents((prevContents) =>
        prevContents.filter((content) => content.contentURL !== contentURL)
      );

      router.refresh();

      setLoading(false);
      toast.success('Content has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const handleUpdateImagePrimary = async (
    contentURL: string,
    newIsPrimary: boolean
  ) => {
    try {
      setLoading(true);

      const imageId = extractPublicIdFromCloudinaryUrl(contentURL);

      const data = { isPrimary: newIsPrimary };

      await axios.patch(`/api/inventory/productImages/${imageId}`, data);

      const updatedImages = contents.map((content) =>
        content.contentURL === contentURL
          ? { ...content, isPrimary: newIsPrimary }
          : { ...content, isPrimary: false }
      );

      setContents(updatedImages);

      setLoading(false);
      router.refresh();

      toast.success(
        newIsPrimary
          ? 'Image has been set as primary'
          : 'Image has been set as non-primary'
      );
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const isImageValue = form.watch('isImage');
  const UploadComponent = isImageValue
    ? BillboardImageUpload
    : BillboardVideoUpload;

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
              name='contents'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <UploadComponent
                      value={
                        field.value
                          ? field.value.map((item) => item.contentURL)
                          : []
                      }
                      disabled={loading}
                      onChange={(contentURL) =>
                        field.onChange([...(field.value ?? []), { contentURL }])
                      }
                      onRemove={(contentURL) => {
                        handleImageRemove(contentURL);
                        const newValue = Array.isArray(field.value)
                          ? field.value.filter(
                              (value: { contentURL: string }) =>
                                value.contentURL !== contentURL
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

          <div>
            <FormField
              control={form.control}
              name='isImage'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>
                          Show billboard as Image
                        </span>
                      ) : (
                        <span className='text-green'>
                          Show billboard as Video
                        </span>
                      )}{' '}
                    </FormLabel>{' '}
                    <FormDescription>
                      {field.value ? (
                        <span className='text-white'>
                          Billboard will be shown as image
                        </span>
                      ) : (
                        <span className='text-black'>
                          Billboard will be shown as video
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-12 gap-4 py-2'>
            <div className='col-span-1'>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        disabled
                        placeholder='Id'
                        value={field.value ?? 0}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-1'>
              <FormField
                control={form.control}
                name='section'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        max={7}
                        placeholder='Input billboard section here'
                        value={field.value ?? 1}
                        onChange={field.onChange}
                        className='text-right justify-end'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-8'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input billboard title here'
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}{' '}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      disabled={loading}
                      placeholder='Type here to add description'
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
