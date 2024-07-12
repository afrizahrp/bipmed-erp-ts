'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

import { ProductSpecs } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
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
  productSpecFormSchema,
  ProductSpecFormValues,
} from '@/utils/schema/productSpec.form.schema';

import { productSpecdefaultValues } from '@/utils/defaultvalues/productSpec.defaultValues';
import FormGroup from '@/components/form-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ProductSpecFormProps {
  specData: ProductSpecs | null | undefined;
}

export const ProductSpecForm: React.FC<ProductSpecFormProps> = ({
  specData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = specData
    ? 'Edit Product Specificiation'
    : 'Add New Product Specificiation';
  const description = specData
    ? `Change Product Specificiation ${specData.id}`
    : 'Add New Product Specificiation';
  const toastMessage = specData
    ? 'Product Specificiation has changed successfully.'
    : 'New Product Specificiation has been added successfully.';
  const action = specData ? 'Save Changes' : 'Save New Product Specificiation';

  const defaultValues = specData
    ? {
        ...specData,
        expired_at: specData.expired_at
          ? new Date(specData.expired_at)
          : undefined,
        base: specData.base ?? '',
        itemFunctions: specData.itemFunctions ?? '',
        item_type: specData.item_type ?? '',
        item_model: specData.item_model ?? '',
        construction: specData.construction ?? '',
        mattress: specData.mattress ?? '',
        mattressSize: specData.mattressSize ?? '',
        mattressThickness: specData.mattressThickness ?? '',
        finishing: specData.finishing ?? '',
        dimension: specData.dimension ?? '',
        powerSupply: specData.powerSupply ?? '',
        loadCapacity: specData.loadCapacity ?? '',
        systemFilter: specData.systemFilter ?? '',
        accessories: specData.accessories ?? '',
        sideRail: specData.sideRail ?? '',
        ivStand: specData.ivStand ?? '',
        wheels: specData.wheels ?? '',
        maxLoad: specData.maxLoad ?? '',
        size: specData.size ?? '',
        weight: specData.weight ?? '',
        standSize: specData.standSize ?? '',
        position: specData.position ?? '',
        basePlate: specData.basePlate ?? '',
        cover: specData.cover ?? '',
        material: specData.material ?? '',
        coverMaterial: specData.coverMaterial ?? '',
        typeScreen: specData.typeScreen ?? '',
        powerConsumption: specData.powerConsumption ?? '',
        lamp: specData.lamp ?? '',
        movers: specData.movers ?? '',
        rim: specData.rim ?? '',
        custodyFeet: specData.custodyFeet ?? '',
        foot: specData.foot ?? '',
        footWear: specData.footWear ?? '',
        pole: specData.pole ?? '',
        inputVoltage: specData.inputVoltage ?? '',
        outputVoltage: specData.outputVoltage ?? '',
        sideGuard: specData.sideGuard ?? '',
        footandheadPanel: specData.footandheadPanel ?? '',
        temperatureControl: specData.temperatureControl ?? '',
        top: specData.top ?? '',
        foodTray: specData.foodTray ?? '',
        traycorpse: specData.traycorpse ?? '',
        pillowthecorpse: specData.pillowthecorpse ?? '',
        lightPole: specData.lightPole ?? '',
        sterilizing: specData.sterilizing ?? '',
        filter: specData.filter ?? '',
        bodyFrame: specData.bodyFrame ?? '',
        underPressure: specData.underPressure ?? '',
        foundationTray: specData.foundationTray ?? '',
        door: specData.door ?? '',
        handle: specData.handle ?? '',
        medicineBox: specData.medicineBox ?? '',
        handleTrolley: specData.handleTrolley ?? '',
        drawer: specData.drawer ?? '',
        systemControl: specData.systemControl ?? '',
        bodyFrameWork: specData.bodyFrameWork ?? '',
        remarks: specData.remarks ?? '',
      }
    : {
        base: '',
        itemFunctions: '',
        item_type: '',
        item_model: '',
        expired_at: undefined,
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

  const form = useForm<ProductSpecFormValues>({
    resolver: zodResolver(productSpecFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductSpecFormValues) => {
    try {
      setLoading(true);
      console.log('Update product spec data first row ', params.id);
      if (specData) {
        // await axios.patch(`/api/inventory/products/${params.id}`, data);
        await axios.patch(`/api/inventory/productSpecs/${params.id}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.push('/productions/products/product-list');
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
      <FormGroup
        title='Product Specification'
        description='Edit product specification information from here'
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <Separator />
            <div>
              <div className='flex gap-4'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Construction</Label>
                </div>
                <div className='w-full gap-2 mb-1'>
                  {' '}
                  {/* Adjust mb-2 to reduce the space */}
                  <FormField
                    control={form.control}
                    name='construction'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder='Input construction here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
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
              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Base Of Material</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='base'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input base here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.base && (
                          <FormMessage>
                            {form.formState.errors.base.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Body Frame</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='bodyFrame'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input bodyFrame here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.bodyFrame && (
                          <FormMessage>
                            {form.formState.errors.bodyFrame.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Dimension</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='dimension'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input dimension here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.dimension && (
                          <FormMessage>
                            {form.formState.errors.dimension.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Position</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input position here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.position && (
                          <FormMessage>
                            {form.formState.errors.position.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Model</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='item_model'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input model here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.item_model && (
                          <FormMessage>
                            {form.formState.errors.item_model.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Functions</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='itemFunctions'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input function here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.itemFunctions && (
                          <FormMessage>
                            {form.formState.errors.itemFunctions.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Cover</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='cover'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input cover here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.cover && (
                          <FormMessage>
                            {form.formState.errors.cover.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Mattress</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='mattress'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input mattress here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.mattress && (
                          <FormMessage>
                            {form.formState.errors.mattress.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Food Tray</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='foodTray'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input foodTray here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.foodTray && (
                          <FormMessage>
                            {form.formState.errors.foodTray.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Drawer</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='drawer'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input drawer here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.drawer && (
                          <FormMessage>
                            {form.formState.errors.drawer.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Custody Feet</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='custodyFeet'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input custodyFeet here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
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

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Head and Foot Panel</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='footandheadPanel'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input head and foot panel here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.footandheadPanel && (
                          <FormMessage>
                            {form.formState.errors.footandheadPanel.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Foot</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='foot'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input head and foot panel here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.foot && (
                          <FormMessage>
                            {form.formState.errors.foot.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Footwear</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='footWear'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input head and footwear here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.footWear && (
                          <FormMessage>
                            {form.formState.errors.footWear.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Top</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='top'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input head and top here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.top && (
                          <FormMessage>
                            {form.formState.errors.top.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Size</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='size'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.size && (
                          <FormMessage>
                            {form.formState.errors.size.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Weight</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='weight'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.weight && (
                          <FormMessage>
                            {form.formState.errors.weight.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Load Capacity</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='loadCapacity'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.loadCapacity && (
                          <FormMessage>
                            {form.formState.errors.loadCapacity.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Max Load</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='maxLoad'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.maxLoad && (
                          <FormMessage>
                            {form.formState.errors.maxLoad.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Power Consumption</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='powerConsumption'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.powerConsumption && (
                          <FormMessage>
                            {form.formState.errors.powerConsumption.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Power Supply</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='powerSupply'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.powerSupply && (
                          <FormMessage>
                            {form.formState.errors.powerSupply.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Input Voltage</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='inputVoltage'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.inputVoltage && (
                          <FormMessage>
                            {form.formState.errors.inputVoltage.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Output Voltage</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='outputVoltage'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.outputVoltage && (
                          <FormMessage>
                            {form.formState.errors.outputVoltage.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Lamp</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='lamp'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.lamp && (
                          <FormMessage>
                            {form.formState.errors.lamp.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Light Pole</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='lightPole'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.lightPole && (
                          <FormMessage>
                            {form.formState.errors.lightPole.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 items-center mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Foundation Tray</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='foundationTray'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Input here'
                            {...field}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        {form.formState.errors.foundationTray && (
                          <FormMessage>
                            {form.formState.errors.foundationTray.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-4 mt-1'>
                <div className='w-1/4 flex justify-end items-right'>
                  <Label className='text-right'>Remarks</Label>
                </div>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='remarks'
                    render={({ field }) => (
                      <FormItem>
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
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between px-3 py-20 top-13'>
              <Button disabled={loading} className='ml-auto' type='submit'>
                {action}{' '}
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              </Button>
            </div>
          </form>
        </Form>
      </FormGroup>
      {/* </div>
      </div> */}
    </>
  );
};
