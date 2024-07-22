'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductSpecs } from '@prisma/client';
import FormGroup from '@/components/form-group';
import { Textarea } from '@/components/ui/textarea';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS

interface ProductSpecFormProps {
  product_id: string;
  initialProductSpecData: ProductSpecs | null;
  className?: string;
}

export const ProductSpecForm: React.FC<ProductSpecFormProps> = ({
  product_id,
  initialProductSpecData,
  className,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const modelValue = watch('model');
  const functionValue = watch('function');
  const constructionValue = watch('construction');
  const bodyFrameValue = watch('bodyFrame');
  const baseValue = watch('base');
  const underPressureValue = watch('underPressure');
  const dimensionValue = watch('dimension');
  const positionValue = watch('position');
  const wheelsValue = watch('wheels');
  const moversValue = watch('movers');
  const finishingValue = watch('finishing');
  const accessoriesValue = watch('accessories');
  const systemFilterValue = watch('systemFilter');
  const coverValue = watch('cover');
  const mattressValue = watch('mattress');
  const standSizeValue = watch('standSize');
  const typeScreenValue = watch('typeScreen');
  const sterilizingValue = watch('sterilizing');
  const filterValue = watch('filter');
  const pillowthecorpseValue = watch('pillowthecorpse');
  const foodTrayValue = watch('foodTray');
  const drawerValue = watch('drawer');
  const custodyFeetValue = watch('custodyFeet');
  const footandheadPanelValue = watch('footandheadPanel');
  const footValue = watch('foot');
  const footwearValue = watch('footwear');
  const topValue = watch('top');
  const sizeValue = watch('size');
  const weightValue = watch('weight');
  const loadCapacityValue = watch('loadCapacity');
  const maxLoadValue = watch('maxLoad');
  const powerConsumptionValue = watch('powerConsumption');
  const powerSupplyValue = watch('powerSupply');
  const inputVoltageValue = watch('inputVoltage');
  const outputVoltageValue = watch('outputVoltage');
  const lampValue = watch('lamp');
  const rimValue = watch('rim');
  const poleValue = watch('pole');
  const doorValue = watch('door');
  const lightPoleValue = watch('lightPole');
  const ivStandValue = watch('ivStand');
  const foundationTrayValue = watch('foundationTray');
  const handleValue = watch('handle');
  const handleTrolleyValue = watch('handleTrolley');
  const sideGuardValue = watch('sideGuard');
  const sideRailValue = watch('sideRail');
  const systemControlValue = watch('systemControl');
  const specremarksValue = watch('specremarks');
  const medicineBoxValue = watch('medicineBox');
  const temperatureControlValue = watch('temperatureControl');

  const [id, setId] = useState(product_id);
  // console.log('stateProductSpec', id);

  const [specremarks, setspecremarks] = useState(
    initialProductSpecData?.specremarks || ''
  );

  return (
    <FormGroup
      title='Product Specification'
      description='Edit product specification information from here'
      className={cn(className)}
    >
      <div>
        <Input
          id='id'
          value={id}
          hidden
          placeholder=' '
          disabled
          {...register('id')}
          className={cn('peer w-1/4', {
            'border-destructive': errors.id,
          })}
        />
        {errors.id && (
          <div className='text-destructive'>
            {errors.id.message?.toString()}
          </div>
        )}
      </div>

      <div className='pt-6'>
        {constructionValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='w-1/4 flex justify-end items-right'>
              <Label className='text-right'>Construction</Label>
            </div>
            <div className='w-full gap-2 mb-2'>
              <Textarea
                {...register('construction')}
                placeholder='Input item construction here'
                rows={2}
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.itemFunctions,
                })}
              />
            </div>
          </div>
        )}

        {modelValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>{modelValue}</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('item_model')}
                placeholder='Input item model item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.item_model,
                })}
              />
            </div>
          </div>
        )}

        {modelValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Type</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('item_type')}
                placeholder='Input type of item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.item_type,
                })}
              />
            </div>
          </div>
        )}

        {functionValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Functions</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('itemFunctions')}
                placeholder='Input function of item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.itemFunctions,
                })}
              />
            </div>
          </div>
        )}

        {baseValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Base Of Material</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('base')}
                placeholder='Input base of material item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.base,
                })}
              />
            </div>
          </div>
        )}

        {bodyFrameValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Body Frame</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('bodyFrame')}
                placeholder='Input bodyFrame'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.bodyFrame,
                })}
              />
            </div>
          </div>
        )}

        {underPressureValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Under Pressure</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('underPressure')}
                placeholder='Input underPressure'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.underPressure,
                })}
              />
            </div>
          </div>
        )}

        {positionValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Position</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('position')}
                placeholder='Input position item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.position,
                })}
              />
            </div>
          </div>
        )}

        {dimensionValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Dimension</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <InputGroup>
                <Input
                  {...register('dimension')}
                  placeholder='Input dimension item here'
                  disabled
                  className={cn('w-full font-semibold text-black text-right', {
                    'border-destructive focus:border-destructive':
                      errors.dimension,
                  })}
                />
                <InputGroupText className='bg-slate-200'>cm</InputGroupText>
              </InputGroup>
            </div>
          </div>
        )}

        {topValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Top</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('top')}
                placeholder='Input top item here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.top,
                })}
              />
            </div>
          </div>
        )}

        {sizeValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Size</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <InputGroup>
                <Input
                  {...register('size')}
                  placeholder='Input size item here'
                  disabled
                  className={cn('w-full font-semibold text-black', {
                    'border-destructive focus:border-destructive': errors.size,
                  })}
                />
                <InputGroupText className='bg-slate-200'>cm</InputGroupText>
              </InputGroup>
            </div>
          </div>
        )}

        {weightValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Weight</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <InputGroup>
                <Input
                  {...register('weight')}
                  placeholder='Input weight item here'
                  disabled
                  className={cn('w-full font-semibold text-black', {
                    'border-destructive focus:border-destructive':
                      errors.weight,
                  })}
                />
                <InputGroupText className='bg-slate-200'>kg</InputGroupText>
              </InputGroup>
            </div>
          </div>
        )}

        {loadCapacityValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Load Capacity</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <InputGroup>
                <Input
                  {...register('loadCapacity')}
                  placeholder='Input load capacity item here'
                  disabled
                  className={cn('w-full font-semibold text-black', {
                    'border-destructive focus:border-destructive':
                      errors.loadCapacity,
                  })}
                />
                <InputGroupText className='bg-slate-200'>L</InputGroupText>
              </InputGroup>
            </div>
          </div>
        )}

        {maxLoadValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Max Load</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <InputGroup>
                <Input
                  {...register('maxLoad')}
                  placeholder='Input maximum load item here'
                  disabled
                  className={cn(
                    'w-full font-semibold text-black text-right justify-end',
                    {
                      'border-destructive focus:border-destructive':
                        errors.maxLoad,
                    }
                  )}
                />
                <InputGroupText className='bg-slate-200'>kg</InputGroupText>
              </InputGroup>
            </div>
          </div>
        )}

        {wheelsValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Wheels</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('wheels')}
                placeholder='Input wheels'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.wheels,
                })}
              />
            </div>
          </div>
        )}

        {moversValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Movers</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Textarea
                {...register('movers')}
                placeholder='Input movers'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.movers,
                })}
              />
            </div>
          </div>
        )}

        {finishingValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Finishing</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('finishing')}
                placeholder='Input finishing'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.finishing,
                })}
              />
            </div>
          </div>
        )}

        {accessoriesValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Accessories</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Textarea
                {...register('accessories')}
                placeholder='Input accessories'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.accessories,
                })}
              />
            </div>
          </div>
        )}

        {systemFilterValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>System Filter</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('systemFilter')}
                placeholder='Input systemFilter'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.systemFilter,
                })}
              />
            </div>
          </div>
        )}

        {systemControlValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>System Control</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('systemControl')}
                placeholder='Input systemControl'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.systemControl,
                })}
              />
            </div>
          </div>
        )}

        {powerConsumptionValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Power Consumption</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('powerConsumption')}
                placeholder='Input power consumption here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.powerConsumption,
                })}
              />
            </div>
          </div>
        )}

        {powerSupplyValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Power Supply</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('powerSupply')}
                placeholder='Input powerSupply'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.powerSupply,
                })}
              />
            </div>
          </div>
        )}

        {inputVoltageValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Input Voltage</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('inputVoltage')}
                placeholder='Input Input Voltage'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.inputVoltage,
                })}
              />
            </div>
          </div>
        )}

        {outputVoltageValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Output Voltage</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('outputVoltage')}
                placeholder='Input Output Voltage'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.outputVoltage,
                })}
              />
            </div>
          </div>
        )}

        {mattressValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Mattress</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Textarea
                {...register('mattress')}
                placeholder='Input size and thickness of mattress here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.mattress,
                })}
              />
            </div>
          </div>
        )}

        {coverValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Cover</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('cover')}
                placeholder='Input cover here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.cover,
                })}
              />
            </div>
          </div>
        )}

        {sideRailValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Side Rail</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('sideRail')}
                placeholder='Input sideRail'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.sideRail,
                })}
              />
            </div>
          </div>
        )}

        {sideGuardValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Side Guard</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('sideGuard')}
                placeholder='Input sideGuard'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.sideGuard,
                })}
              />
            </div>
          </div>
        )}

        {ivStandValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>IV Stand</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('ivStand')}
                placeholder='Input ivStand'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.ivStand,
                })}
              />
            </div>
          </div>
        )}

        {standSizeValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Stand Size</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('standSize')}
                placeholder='Input standSize'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.standSize,
                })}
              />
            </div>
          </div>
        )}

        {typeScreenValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Screen Type</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('typeScreen')}
                placeholder='Input screen type here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.typeScreen,
                })}
              />
            </div>
          </div>
        )}

        {lightPoleValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Light Pole</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('lightPole')}
                placeholder='Input light pole here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.lightPole,
                })}
              />
            </div>
          </div>
        )}

        {sterilizingValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Sterilizing</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('sterilizing')}
                placeholder='Input Sterilizer here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.sterilizing,
                })}
              />
            </div>
          </div>
        )}

        {filterValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Filter</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('filter')}
                placeholder='Input filter here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.filter,
                })}
              />
            </div>
          </div>
        )}

        {bodyFrameValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Body Framework</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('bodyFrame')}
                placeholder='Input light pole here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.bodyFrame,
                })}
              />
            </div>
          </div>
        )}

        {lampValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Lamp</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('lamp')}
                placeholder='Input lamp here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.lamp,
                })}
              />
            </div>
          </div>
        )}

        {rimValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Rim</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('rim')}
                placeholder='Input rim here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.rim,
                })}
              />
            </div>
          </div>
        )}

        {poleValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Pole</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('pole')}
                placeholder='Input pole here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.pole,
                })}
              />
            </div>
          </div>
        )}

        {custodyFeetValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Custody Feet</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('custodyFeet')}
                placeholder='Input custody feet here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.custodyFeet,
                })}
              />
            </div>
          </div>
        )}

        {footwearValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Foot Wear</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('footwear')}
                placeholder='Input foot wear here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.footwear,
                })}
              />
            </div>
          </div>
        )}

        {footValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Foot</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('foot')}
                placeholder='Input foot here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.foot,
                })}
              />
            </div>
          </div>
        )}

        {footandheadPanelValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Foot and Head Panel</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('footandheadPanel')}
                placeholder='Input foot wear here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.footandheadPanel,
                })}
              />
            </div>
          </div>
        )}

        {foodTrayValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Food Tray</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('foodTray')}
                placeholder='Input food tray here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.foodTray,
                })}
              />
            </div>
          </div>
        )}

        {foundationTrayValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Foundation Tray</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('foundationTray')}
                placeholder='Input foundation tray here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.foundationTray,
                })}
              />
            </div>
          </div>
        )}

        {doorValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Door</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('door')}
                placeholder='Input door here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.door,
                })}
              />
            </div>
          </div>
        )}

        {handleValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Handle</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('handle')}
                placeholder='Input handle here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.handle,
                })}
              />
            </div>
          </div>
        )}

        {handleTrolleyValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Handle Trolley</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('handleTrolley')}
                placeholder='Input handleTrolley here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.handleTrolley,
                })}
              />
            </div>
          </div>
        )}

        {medicineBoxValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Medicine Box</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('medicineBox')}
                placeholder='Input medicine box here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.medicineBox,
                })}
              />
            </div>
          </div>
        )}

        {drawerValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Drawer</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('drawer')}
                placeholder='Input drawer here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive': errors.drawer,
                })}
              />
            </div>
          </div>
        )}

        {temperatureControlValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Temperature Control</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Input
                {...register('temperatureControl')}
                placeholder='Input temperature control here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.temperatureControl,
                })}
              />
            </div>
          </div>
        )}

        {specremarksValue && (
          <div className='flex gap-4 items-center mt-1'>
            <div className='flex w-1/4 justify-end items-right'>
              <Label className='text-right'>Remarks</Label>
            </div>
            <div className='flex w-full gap-2 mb-2'>
              <Textarea
                {...register('specremarks')}
                placeholder='Input remarks here'
                disabled
                className={cn('w-full font-semibold text-black', {
                  'border-destructive focus:border-destructive':
                    errors.specremarks,
                })}
              />
            </div>
          </div>
        )}
      </div>
    </FormGroup>
  );
};
