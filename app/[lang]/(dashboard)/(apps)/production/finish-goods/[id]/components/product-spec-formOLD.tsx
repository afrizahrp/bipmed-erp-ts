'use client';

import {
  productSpecFormSchema,
  ProductSpecFormValues,
} from '@/utils/schema/productSpec.form.schema';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFormContext } from 'react-hook-form';
// import { Input, Textarea, Select, Checkbox } from 'rizzui';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductSpecs } from '@prisma/client';

import FormGroup from '@/components/form-group';
import { Textarea } from '@/components/ui/textarea';

interface ProductSpecFormProps {
  specData: ProductSpecs | null;
}

export const ProductSpecFormOLD: React.FC<ProductSpecFormProps> = ({
  specData,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='flex flex-col gap-2'>
      <FormGroup
        title='Product Specification'
        description='Edit product specification information from here'
      >
        <Label
          htmlFor='item_model'
          className={cn('', {
            'text-destructive': errors.item_model,
          })}
        >
          Model
        </Label>
        <Input
          type='text'
          {...register('item_model')}
          placeholder='Input item model here'
          className={cn('', {
            'border-destructive focus:border-destructive': errors.item_model,
          })}
        />

        <Label
          htmlFor='itemFunctions'
          className={cn('', {
            'text-destructive': errors.itemFunctions,
          })}
        >
          Functions
        </Label>
        <Input
          type='text'
          {...register('itemFunctions')}
          placeholder='Input item functions here'
          className={cn('', {
            'border-destructive focus:border-destructive': errors.itemFunctions,
          })}
        />

        {/* <Input
        label='Model'
        placeholder='Model'
        {...register('model')}
        onError={errors.model?.message as string}
      />

      <Input
        label='Function'
        placeholder='Function'
        {...register('function')}
        error={errors.function?.message as string}
      />

      <Textarea
        label='Construction'
        placeholder='Input construction here'
        {...register('construction')}
        error={errors.name?.message as string}
        className='col-span-2'
        // labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      />

      <Input
        label='Body Frame'
        placeholder='Body Frame'
        {...register('bodyFrame')}
        error={errors.bodyFrame?.message as string}
      />

      <Input
        label='Base Of Material'
        placeholder='Base Of Material'
        {...register('base')}
        error={errors.base?.message as string}
      />

      <Input
        label='Dimension'
        placeholder='Dimension'
        {...register('dimension')}
        error={errors.dimension?.message as string}
      />

      <Input
        label='Position'
        placeholder='Position'
        {...register('position')}
        error={errors.position?.message as string}
      />

      <Input
        label='Cover'
        placeholder='Cover'
        {...register('cover')}
        error={errors.cover?.message as string}
      />

      <Input
        label='Mattress'
        placeholder='Mattress'
        {...register('mattress')}
        error={errors.mattress?.message as string}
      />

      <Input
        label='Pillow The Corpse'
        placeholder=' Pillow The Corpse'
        {...register('pillowthecorpse')}
        error={errors.pillowthecorpse?.message as string}
      />

      <Input
        label='Food Tray'
        placeholder=' Food Tray'
        {...register('foodTray')}
        error={errors.foodTray?.message as string}
      />

      <Input
        label='Drawer'
        placeholder=' Drawer'
        {...register('drawer')}
        error={errors.drawer?.message as string}
      />

      <Input
        label='Custody Feet'
        placeholder=' Custody Feet'
        {...register('custodyFeet')}
        error={errors.custodyFeet?.message as string}
      />

      <Input
        label='Foot and Head Panel'
        placeholder=' Foot and Head Panel'
        {...register('footandheadPanel')}
        error={errors.footandheadPanel?.message as string}
      />

      <Input
        label='Foot'
        placeholder=' Foot'
        {...register('foot')}
        error={errors.foot?.message as string}
      />

      <Input
        label='Foot Wear'
        placeholder=' Foot Wear'
        {...register('footwear')}
        error={errors.footwear?.message as string}
      />

      <Input
        label='Top'
        placeholder=' Top'
        {...register('top')}
        error={errors.top?.message as string}
      />

      <Input
        label='Size'
        placeholder=' Size'
        {...register('size')}
        error={errors.size?.message as string}
      />

      <Input
        label='Weight'
        placeholder=' Weight'
        {...register('weight')}
        error={errors.weight?.message as string}
      />

      <Input
        label='Load Capacity'
        placeholder=' Load Capacity'
        {...register('loadCapacity')}
        error={errors.loadCapacity?.message as string}
      />

      <Input
        label='Max.Load'
        placeholder=' Max. Load'
        {...register('maxLoad')}
        error={errors.maxLoad?.message as string}
      />

      <Input
        label='Power Consumption'
        placeholder=' Power Consumption'
        {...register('powerConsumption')}
        error={errors.powerConsumption?.message as string}
      />

      <Input
        label='Power Supply'
        placeholder=' Power Supply'
        {...register('powerSupply')}
        error={errors.powerSupply?.message as string}
      />

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Input
            label='Input Voltage'
            placeholder=' Input Voltage'
            {...register('inputVoltage')}
            error={errors.inputVoltage?.message as string}
          />
        </div>

        <div>
          <Input
            label='Output Voltage'
            placeholder='Output Voltage'
            {...register('outputVoltage')}
            error={errors.outputVoltage?.message as string}
          />
        </div>
      </div>

      <Input
        label='Lamp'
        placeholder=' Lamp'
        {...register('lamp')}
        error={errors.lamp?.message as string}
      />

      <Input
        label='Light Pole'
        placeholder=' Light Pole'
        {...register('lightPole')}
        error={errors.lightPole?.message as string}
      />

      <Input
        label='Foundation Tray'
        placeholder=' Foundation Tray'
        {...register('foundationTray')}
        error={errors.foundationTray?.message as string}
      />

      <Input
        label='Handle'
        placeholder='Handle'
        {...register('handle')}
        error={errors.handle?.message as string}
      />

      <Input
        label='Handle Trolley'
        placeholder='Handle Trolley'
        {...register('handleTrolley')}
        error={errors.handleTrolley?.message as string}
      />

      <Input
        label='Side Guard'
        placeholder='Side Guard'
        {...register('sideGuard')}
        error={errors.sideGuard?.message as string}
      />

      <Input
        label='Side Rail'
        placeholder='Side Rail'
        {...register('sideRail')}
        error={errors.sideRail?.message as string}
      />

      <Input
        label='System Control'
        placeholder='System Control'
        {...register('systemControl')}
        error={errors.systemControl?.message as string}
      />

      <Input
        label='Filter'
        placeholder='Filter'
        {...register('filter')}
        error={errors.filter?.message as string}
      />

      <Input
        label='Sterilizing'
        placeholder='Sterilizing'
        {...register('sterilizing')}
        error={errors.sterilizing?.message as string}
      />

      <Input
        label='Temperature Control'
        placeholder='Temperature Control'
        {...register('temperatureControl')}
        error={errors.temperatureControl?.message as string}
      />

      <Input
        label='Stand Size'
        placeholder='Stand Size'
        {...register('standSize')}
        error={errors.standSize?.message as string}
      />

      <Input
        label='Medicine Box'
        placeholder='Medicine Box'
        {...register('medicineBox')}
        error={errors.medicineBox?.message as string}
      />

      <Input
        label='Movers'
        placeholder='Movers'
        {...register('movers')}
        error={errors.movers?.message as string}
      />

      <Input
        label='Wheel'
        placeholder='Wheel'
        {...register('wheels')}
        error={errors.wheels?.message as string}
      />

      <Input
        label='Rim'
        placeholder='Rim'
        {...register('rim')}
        error={errors.rim?.message as string}
      />

      <Input
        label='Pole'
        placeholder='Pole'
        {...register('pole')}
        error={errors.pole?.message as string}
      />

      <Input
        label='Tray Corpse'
        placeholder='Tray Corpse'
        {...register('traycorpse')}
        error={errors.traycorpse?.message as string}
      />

      <Input
        label='Food Tray'
        placeholder='Food Tray'
        {...register('foodTray')}
        error={errors.foodTray?.message as string}
      />

      <Input
        label='Type Screen'
        placeholder='Type Screen'
        {...register('typeScreen')}
        error={errors.typeScreen?.message as string}
      />

      <Input
        label='Cover Material'
        placeholder='Cover Material'
        {...register('coverMaterial')}
        error={errors.coverMaterial?.message as string}
      />

      <Input
        label='Finishing'
        placeholder='Finishing'
        {...register('finishing')}
        error={errors.finishing?.message as string}
      />

      <Input
        label='Accessories'
        placeholder='Accessories'
        {...register('accessories')}
        error={errors.accessories?.message as string}
      />

      <Input
        label='Under Pressure'
        placeholder='Under Pressure'
        {...register('underPressure')}
        error={errors.underPressure?.message as string}
      />

      <Textarea
        label='Remarks'
        placeholder='Remarks'
        {...register('remarks')}
        error={errors.remarks?.message as string}
        className='col-span-2'
        // labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      /> */}
      </FormGroup>
    </div>
  );
};
