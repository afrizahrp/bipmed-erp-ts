'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

import FormGroup from './form-group';
import { ProductSpecs } from '@prisma/client';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/Label_T';
import { Separator } from '@/components/ui/separator_T';

const formSchema = z.object({
  id: z.string().optional().nullable(),
  catalog_id: z.string().min(1).optional(),
  base: z.string().min(3).optional(),
  itemFunctions: z.string().optional().nullable(),
  item_type: z.string().optional().nullable(),
  item_model: z.string().optional().nullable(),
  expired_at: z.string().optional().nullable(),
  construction: z.string().optional().nullable(),
  mattress: z.string().optional().nullable(),
  mattressSize: z.string().optional().nullable(),
  mattressThickness: z.string().optional().nullable(),
  finishing: z.string().optional().nullable(),
  dimension: z.string().optional().nullable(),
  powerSupply: z.string().optional().nullable(),
  loadCapacity: z.string().optional().nullable(),
  systemFilter: z.string().optional().nullable(),
  accessories: z.string().optional().nullable(),
  sideRail: z.string().optional().nullable(),
  ivStand: z.string().optional().nullable(),
  wheels: z.string().optional().nullable(),
  maxLoad: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  standSize: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  basePlate: z.string().optional().nullable(),
  cover: z.string().optional().nullable(),
  material: z.string().optional().nullable(),
  coverMaterial: z.string().optional().nullable(),
  typeScreen: z.string().optional().nullable(),
  powerConsumption: z.string().optional().nullable(),
  lamp: z.string().optional().nullable(),
  movers: z.string().optional().nullable(),
  rim: z.string().optional().nullable(),
  custodyFeet: z.string().optional().nullable(),
  foot: z.string().optional().nullable(),
  footWear: z.string().optional().nullable(),
  pole: z.string().optional().nullable(),
  inputVoltage: z.string().optional().nullable(),
  outputVoltage: z.string().optional().nullable(),
  sideGuard: z.string().optional().nullable(),
  footandheadPanel: z.string().optional().nullable(),
  temperatureControl: z.string().optional().nullable(),
  top: z.string().optional().nullable(),
  foodTray: z.string().optional().nullable(),
  traycorpse: z.string().optional().nullable(),
  pillowthecorpse: z.string().optional().nullable(),
  lightPole: z.string().optional().nullable(),
  sterilizing: z.string().optional().nullable(),
  filter: z.string().optional().nullable(),
  bodyFrame: z.string().optional().nullable(),
  underPressure: z.string().optional().nullable(),
  foundationTray: z.string().optional().nullable(),
  door: z.string().optional().nullable(),
  handle: z.string().optional().nullable(),
  medicineBox: z.string().optional().nullable(),
  handleTrolley: z.string().optional().nullable(),
  drawer: z.string().optional().nullable(),
  systemControl: z.string().optional().nullable(),
  bodyFrameWork: z.string().optional().nullable(),
  remarks: z.string().optional().nullable(),
});

type ProductsSpecFormValues = z.infer<typeof formSchema>;

interface ProductSpecFormProps {
  initialData: ProductSpecs | null | undefined;
}

export const ProductSpecForm: React.FC<ProductSpecFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? 'Edit Product Specificiation'
    : 'Add New Product Specificiation';
  const description = initialData
    ? `Change Product Specificiation ${initialData.id}-> ${initialData.name}`
    : 'Add New Product Specificiation';
  const toastMessage = initialData
    ? 'Product Specificiation has changed successfully.'
    : 'New Product Specificiation has been added successfully.';
  const action = initialData
    ? 'Save Changes'
    : 'Save New Product Specificiation';

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        base: '',
        itemFunctions: '',
        item_type: '',
        item_model: '',
        expired_at: '',
        construction: '',
        mattress: '',
        mattressSize: '',
        mattressThickness: '',
        finishing: '',
        dimension: '',
        powerSupply: '',
        loadCapacity: '',
        systemFilter: '',
        accessories: '',
        sideRail: '',
        ivStand: '',
        wheels: '',
        maxLoad: '',
        size: '',
        weight: '',
        standSize: '',
        position: '',
        basePlate: '',
        cover: '',
        material: '',
        coverMaterial: '',
        typeScreen: '',
        powerConsumption: '',
        lamp: '',
        movers: '',
        rim: '',
        custodyFeet: '',
        foot: '',
        footWear: '',
        pole: '',
        inputVoltage: '',
        outputVoltage: '',
        sideGuard: '',
        footandheadPanel: '',
        temperatureControl: '',
        top: '',
        foodTray: '',
        traycorpse: '',
        pillowthecorpse: '',
        lightPole: '',
        sterilizing: '',
        filter: '',
        bodyFrame: '',
        underPressure: '',
        foundationTray: '',
        door: '',
        handle: '',
        medicineBox: '',
        handleTrolley: '',
        drawer: '',
        systemControl: '',
        bodyFrameWork: '',
        remarks: '',
      };

  const form = useForm<ProductsSpecFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductsSpecFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${params.id}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.push('/inventory/products/product-list');
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.error(error); // Log the error to the console for debugging

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Construction
              </Label>

              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='construction'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='w-full'
                          disabled={loading}
                          placeholder='construction'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.construction && (
                        <FormMessage>
                          {form.formState.errors.construction.message}
                        </FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Dimension
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='dimension'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='dimension'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.dimension && (
                        <FormMessage>
                          {form.formState.errors.dimension.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Position
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='position'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.position && (
                        <FormMessage>
                          {form.formState.errors.position.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Base of Material
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='base'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Input base of material here'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.base && (
                        <FormMessage>
                          {form.formState.errors.base.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Body Frame
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='bodyFrame'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Input body frame here'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.bodyFrame && (
                        <FormMessage>
                          {form.formState.errors.bodyFrame.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0 '>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Material
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='material'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='material'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.material && (
                        <FormMessage>
                          {form.formState.errors.material.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0 '>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Model
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='model'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='model'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.model && (
                        <FormMessage>
                          {form.formState.errors.model.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Function
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='function'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='function'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.function && (
                        <FormMessage>
                          {form.formState.errors.function.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Cover
              </Label>

              <div className='w-1/2 '>
                <FormField
                  control={form.control}
                  name='cover'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='cover'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.cover && (
                        <FormMessage>
                          {form.formState.errors.cover.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Mattress
              </Label>

              <div className='w-1/2 '>
                <FormField
                  control={form.control}
                  name='mattress'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='mattress'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.mattress && (
                        <FormMessage>
                          {form.formState.errors.mattress.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Pillow The Corpse
              </Label>

              <div className='w-1/2 '>
                <FormField
                  control={form.control}
                  name='pillowthecorpse'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='pillowthecorpse'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.pillowthecorpse && (
                        <FormMessage>
                          {form.formState.errors.pillowthecorpse.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Food Tray
              </Label>

              <div className='w-1/2 '>
                <FormField
                  control={form.control}
                  name='foodTray'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='foodTray'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.foodTray && (
                        <FormMessage>
                          {form.formState.errors.foodTray.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Drawer
              </Label>
              <div className='w-1/2 '>
                <FormField
                  control={form.control}
                  name='drawer'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='drawer'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.drawer && (
                        <FormMessage>
                          {form.formState.errors.drawer.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Custody Feet
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='custodyFeet'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='custodyFeet'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.custodyFeet && (
                        <FormMessage>
                          {form.formState.errors.custodyFeet.message}
                        </FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Foot and Head Panel
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='footandheadPanel'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='footandheadPanel'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.footandheadPanel && (
                        <FormMessage>
                          {form.formState.errors.footandheadPanel.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Foot
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='foot'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='foot'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.foot && (
                        <FormMessage>
                          {form.formState.errors.foot.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Foot Wear
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='footwear'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='footwear'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.footwear && (
                        <FormMessage>
                          {form.formState.errors.footwear.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Top
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='top'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='top'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.top && (
                        <FormMessage>
                          {form.formState.errors.top.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Size
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='size'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='size'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.size && (
                        <FormMessage>
                          {form.formState.errors.size.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Weight
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='weight'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.weight && (
                        <FormMessage>
                          {form.formState.errors.weight.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Load Capacity
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='loadCapacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='loadCapacity'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.loadCapacity && (
                        <FormMessage>
                          {form.formState.errors.loadCapacity.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Max Load
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='maxLoad'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='maxLoad'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.maxLoad && (
                        <FormMessage>
                          {form.formState.errors.maxLoad.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Power Supply
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='powerSupply'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='powerSupply'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.powerSupply && (
                        <FormMessage>
                          {form.formState.errors.powerSupply.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Power Consumption
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='powerConsumption'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='powerConsumption'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.powerConsumption && (
                        <FormMessage>
                          {form.formState.errors.powerConsumption.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Input Voltage
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='inputVoltage'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='inputVoltage'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.inputVoltage && (
                        <FormMessage>
                          {form.formState.errors.inputVoltage.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Output Voltage
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='outputVoltage'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='outputVoltage'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.outputVoltage && (
                        <FormMessage>
                          {form.formState.errors.outputVoltage.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Lamp
              </Label>

              <div className='w-1/2'>
                <FormField
                  control={form.control}
                  name='lamp'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='lamp'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.lamp && (
                        <FormMessage>
                          {form.formState.errors.lamp.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2  flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0'>
              <Label htmlFor='hrFullName2' className='lg:min-w-[160px]'>
                Light Pole{' '}
              </Label>

              <div className='w-1/2'>
                {' '}
                <FormField
                  control={form.control}
                  name='lightPole'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='lightPole'
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.lightPole && (
                        <FormMessage>
                          {form.formState.errors.lightPole.message}
                        </FormMessage>
                      )}{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/*
          <div className='flex gap-4'>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='ivStand'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Iv.Stand</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='ivStand'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.ivStand && (
                      <FormMessage>
                        {form.formState.errors.ivStand.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='foundationTray'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foundation Tray</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='foundationTray'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.foundationTray && (
                      <FormMessage>
                        {form.formState.errors.foundationTray.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='handle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handle</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='handle'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.handle && (
                      <FormMessage>
                        {form.formState.errors.handle.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='handleTrolley'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handle Trolley</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='handleTrolley'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.handleTrolley && (
                      <FormMessage>
                        {form.formState.errors.handleTrolley.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='sideGuard'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Side Guard</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='sideGuard'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.sideGuard && (
                      <FormMessage>
                        {form.formState.errors.sideGuard.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='sideRail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Side Rail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='sideRail'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.sideRail && (
                      <FormMessage>
                        {form.formState.errors.sideRail.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='systemControl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Control</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='systemControl'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.systemControl && (
                      <FormMessage>
                        {form.formState.errors.systemControl.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='systemFilter'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Filter</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='systemFilter'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.systemFilter && (
                      <FormMessage>
                        {form.formState.errors.systemFilter.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='temperatureControl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature Control</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='temperatureControl'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.temperatureControl && (
                      <FormMessage>
                        {form.formState.errors.temperatureControl.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='standSize'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stand Size</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='standSize'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.standSize && (
                      <FormMessage>
                        {form.formState.errors.standSize.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='medicineBox'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Box</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='medicineBox'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.medicineBox && (
                      <FormMessage>
                        {form.formState.errors.medicineBox.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='wheels'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wheels</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='wheels'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.wheels && (
                      <FormMessage>
                        {form.formState.errors.wheels.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='movers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movers</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='movers'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.movers && (
                      <FormMessage>
                        {form.formState.errors.movers.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='sterilizing'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sterilizing</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='sterilizing'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.sterilizing && (
                      <FormMessage>
                        {form.formState.errors.sterilizing.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='rim'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RIM</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='rim' {...field} />
                    </FormControl>
                    {form.formState.errors.rim && (
                      <FormMessage>
                        {form.formState.errors.rim.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='traycorpse'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tray Corpse </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='traycorpse'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.traycorpse && (
                      <FormMessage>
                        {form.formState.errors.traycorpse.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='typeScreen'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Screen</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='typeScreen'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.typeScreen && (
                      <FormMessage>
                        {form.formState.errors.typeScreen.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='underPressure'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Under Pressure</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='underPressure'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.underPressure && (
                      <FormMessage>
                        {form.formState.errors.underPressure.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='filter'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='filter'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.filter && (
                      <FormMessage>
                        {form.formState.errors.filter.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='finishing'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finishing</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='finishing'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.finishing && (
                      <FormMessage>
                        {form.formState.errors.finishing.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-col gap-4'>
              <FormField
                control={form.control}
                name='accessories'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accessories</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='accessories'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.accessories && (
                      <FormMessage>
                        {form.formState.errors.accessories.message}
                      </FormMessage>
                    )}{' '}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='w-full'>
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
                  {form.formState.errors.remarks && (
                    <FormMessage>
                      {form.formState.errors.remarks.message}
                    </FormMessage>
                  )}{' '}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          {/* <div className='flex items-center justify-between px-3 py-20 top-13'>
            <Button disabled={loading} className='ml-auto' type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div> */}
        </form>
      </Form>
    </>
  );
};
