'use client';
import { useFormContext } from 'react-hook-form';
// import { Input, Textarea, Select, Checkbox } from 'rizzui';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import cn from '@/utils/class-names';
import FormGroup from '@/components/form-group';
import { Textarea } from '@/components/ui/textarea';

interface ProductSpecFormProps {
  className?: string;
}

export const ProductSpecForm: React.FC<ProductSpecFormProps> = ({
  className,
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  // const modelValue = watch('model');
  // const functionValue = watch('function');
  // const constructionValue = watch('construction');
  // const bodyFrameValue = watch('bodyFrame');
  // const baseValue = watch('base');
  // const dimensionValue = watch('dimension');
  // const positionValue = watch('position');
  // const coverValue = watch('cover');
  // const mattressValue = watch('mattress');
  // const pillowthecorpseValue = watch('pillowthecorpse');
  // const foodTrayValue = watch('foodTray');
  // const drawerValue = watch('drawer');
  // const custodyFeetValue = watch('custodyFeet');
  // const footandheadPanelValue = watch('footandheadPanel');
  // const footValue = watch('foot');
  // const footwearValue = watch('footwear');
  // const topValue = watch('top');
  // const sizeValue = watch('size');
  // const weightValue = watch('weight');
  // const loadCapacityValue = watch('loadCapacity');
  // const maxLoadValue = watch('maxLoad');
  // const powerConsumptionValue = watch('powerConsumption');
  // const powerSupplyValue = watch('powerSupply');
  // const inputVoltageValue = watch('inputVoltage');
  // const outputVoltageValue = watch('outputVoltage');
  // const lampValue = watch('lamp');
  // const lightPoleValue = watch('lightPole');
  // const ivStandValue = watch('ivStand');
  // const foundationTrayValue = watch('foundationTray');
  // const handleValue = watch('handle');
  // const handleTrolleyValue = watch('handleTrolley');
  // const sideGuardValue = watch('sideGuard');
  // const sideRailValue = watch('sideRail');
  // const systemControlValue = watch('systemControl');

  return (
    <FormGroup
      title='Specification Product Information'
      className={cn('grid grid-cols-2 gap-4', className)}
    >
      <Input
        placeholder='Model'
        {...register('model')}
        error={errors.model?.message as string}
      />

      <Input
        placeholder='Function'
        {...register('function')}
        error={errors.function?.message as string}
      />

      <Textarea
        placeholder='Input construction here'
        {...register('construction')}
        error={errors.name?.message as string}
        className='col-span-2'
        // labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      />

      <Input
        placeholder='Body Frame'
        {...register('bodyFrame')}
        error={errors.bodyFrame?.message as string}
      />

      <Input
        placeholder='Base Of Material'
        {...register('base')}
        error={errors.base?.message as string}
      />

      <Input
        placeholder='Dimension'
        {...register('dimension')}
        error={errors.dimension?.message as string}
      />

      <Input
        placeholder='Position'
        {...register('position')}
        error={errors.position?.message as string}
      />

      <Input
        placeholder='Cover'
        {...register('cover')}
        error={errors.cover?.message as string}
      />

      <Input
        placeholder='Mattress'
        {...register('mattress')}
        error={errors.mattress?.message as string}
      />

      <Input
        placeholder=' Pillow The Corpse'
        {...register('pillowthecorpse')}
        error={errors.pillowthecorpse?.message as string}
      />

      <Input
        placeholder=' Food Tray'
        {...register('foodTray')}
        error={errors.foodTray?.message as string}
      />

      <Input
        placeholder=' Drawer'
        {...register('drawer')}
        error={errors.drawer?.message as string}
      />

      <Input
        placeholder=' Custody Feet'
        {...register('custodyFeet')}
        error={errors.custodyFeet?.message as string}
      />

      <Input
        placeholder=' Foot and Head Panel'
        {...register('footandheadPanel')}
        error={errors.footandheadPanel?.message as string}
      />

      <Input
        placeholder=' Foot'
        {...register('foot')}
        error={errors.foot?.message as string}
      />

      <Input
        placeholder=' Foot Wear'
        {...register('footwear')}
        error={errors.footwear?.message as string}
      />

      <Input
        placeholder=' Top'
        {...register('top')}
        error={errors.top?.message as string}
      />

      <Input
        placeholder=' Size'
        {...register('size')}
        error={errors.size?.message as string}
      />

      <Input
        placeholder=' Weight'
        {...register('weight')}
        error={errors.weight?.message as string}
      />

      <Input
        placeholder=' Load Capacity'
        {...register('loadCapacity')}
        error={errors.loadCapacity?.message as string}
      />

      <Input
        placeholder=' Max. Load'
        {...register('maxLoad')}
        error={errors.maxLoad?.message as string}
      />

      <Input
        placeholder=' Power Consumption'
        {...register('powerConsumption')}
        error={errors.powerConsumption?.message as string}
      />

      <Input
        placeholder=' Power Supply'
        {...register('powerSupply')}
        error={errors.powerSupply?.message as string}
      />

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Input
            placeholder=' Input Voltage'
            {...register('inputVoltage')}
            error={errors.inputVoltage?.message as string}
          />
        </div>

        <div>
          <Input
            placeholder='Output Voltage'
            {...register('outputVoltage')}
            error={errors.outputVoltage?.message as string}
          />
        </div>
      </div>

      <Input
        placeholder=' Lamp'
        {...register('lamp')}
        error={errors.lamp?.message as string}
      />

      <Input
        placeholder=' Light Pole'
        {...register('lightPole')}
        error={errors.lightPole?.message as string}
      />

      <Input
        placeholder=' Foundation Tray'
        {...register('foundationTray')}
        error={errors.foundationTray?.message as string}
      />

      <Input
        placeholder='Handle'
        {...register('handle')}
        error={errors.handle?.message as string}
      />

      <Input
        placeholder='Handle Trolley'
        {...register('handleTrolley')}
        error={errors.handleTrolley?.message as string}
      />

      <Input
        placeholder='Side Guard'
        {...register('sideGuard')}
        error={errors.sideGuard?.message as string}
      />

      <Input
        placeholder='Side Rail'
        {...register('sideRail')}
        error={errors.sideRail?.message as string}
      />

      <Input
        placeholder='System Control'
        {...register('systemControl')}
        error={errors.systemControl?.message as string}
      />

      <Input
        placeholder='Filter'
        {...register('filter')}
        error={errors.filter?.message as string}
      />

      <Input
        placeholder='Sterilizing'
        {...register('sterilizing')}
        error={errors.sterilizing?.message as string}
      />

      <Input
        placeholder='Temperature Control'
        {...register('temperatureControl')}
        error={errors.temperatureControl?.message as string}
      />

      <Input
        placeholder='Stand Size'
        {...register('standSize')}
        error={errors.standSize?.message as string}
      />

      <Input
        placeholder='Medicine Box'
        {...register('medicineBox')}
        error={errors.medicineBox?.message as string}
      />

      <Input
        placeholder='Movers'
        {...register('movers')}
        error={errors.movers?.message as string}
      />

      <Input
        placeholder='Wheel'
        {...register('wheels')}
        error={errors.wheels?.message as string}
      />

      <Input
        placeholder='Rim'
        {...register('rim')}
        error={errors.rim?.message as string}
      />

      <Input
        placeholder='Pole'
        {...register('pole')}
        error={errors.pole?.message as string}
      />

      <Input
        placeholder='Tray Corpse'
        {...register('traycorpse')}
        error={errors.traycorpse?.message as string}
      />

      <Input
        placeholder='Food Tray'
        {...register('foodTray')}
        error={errors.foodTray?.message as string}
      />

      <Input
        placeholder='Type Screen'
        {...register('typeScreen')}
        error={errors.typeScreen?.message as string}
      />

      <Input
        placeholder='Cover Material'
        {...register('coverMaterial')}
        error={errors.coverMaterial?.message as string}
      />

      <Input
        placeholder='Finishing'
        {...register('finishing')}
        error={errors.finishing?.message as string}
      />

      <Input
        placeholder='Accessories'
        {...register('accessories')}
        error={errors.accessories?.message as string}
      />

      <Input
        placeholder='Under Pressure'
        {...register('underPressure')}
        error={errors.underPressure?.message as string}
      />

      <Textarea
        placeholder='Remarks'
        {...register('remarks')}
        error={errors.remarks?.message as string}
        className='col-span-2'
        // labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      />
    </FormGroup>
  );
};
