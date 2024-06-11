'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
// import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

import { ProductSpecs } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

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
} from '@/components/ui/form_T';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select_T';
import { Checkbox } from '@/components/ui/checkbox';

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
          className='space-y-8 w-full'
        >
          <div className='flex gap-4'>
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

          <div className='flex items-center justify-between px-3 py-20 top-13'>
            <Button disabled={loading} className='ml-auto' type='submit'>
              {action}{' '}
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>
      {/* </div>
      </div> */}
    </>
  );
};
