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
        <div className='flex gap-4 items-center mt-1'>
          <div className='w-1/4 flex justify-end items-right'>
            <Label className='text-right'>Construction</Label>
          </div>
          <div className='w-full gap-2 mb-2'>
            <Textarea
              {...register('construction')}
              placeholder='Input item construction here'
              rows={2}
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.itemFunctions,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Model</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('item_model')}
              placeholder='Input item model item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.item_model,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Type</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('item_type')}
              placeholder='Input type of item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.item_type,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Functions</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('itemFunctions')}
              placeholder='Input function of item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.itemFunctions,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Base Of Material</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('base')}
              placeholder='Input base of material item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.base,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Body Frame</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('bodyFrame')}
              placeholder='Input bodyFrame'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.bodyFrame,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Under Pressure</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('underPressure')}
              placeholder='Input underPressure'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.underPressure,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Position</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('position')}
              placeholder='Input position item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.position,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Dimension</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <InputGroup>
              <Input
                {...register('dimension')}
                placeholder='Input dimension item here'
                className={cn('w-full text-right', {
                  'border-destructive focus:border-destructive':
                    errors.dimension,
                })}
              />
              <InputGroupText className='bg-slate-200'>cm</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Top</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('top')}
              placeholder='Input top item here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.top,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Size</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <InputGroup>
              <Input
                {...register('size')}
                placeholder='Input size item here'
                className={cn('w-full text-right', {
                  'border-destructive focus:border-destructive': errors.size,
                })}
              />
              <InputGroupText className='bg-slate-200'>cm</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Weight</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <InputGroup>
              <Input
                {...register('weight')}
                placeholder='Input weight item here'
                className={cn('w-full text-right', {
                  'border-destructive focus:border-destructive': errors.weight,
                })}
              />
              <InputGroupText className='bg-slate-200'>kg</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Load Capacity</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <InputGroup>
              <Input
                {...register('loadCapacity')}
                placeholder='Input load capacity item here'
                className={cn('w-full text-right', {
                  'border-destructive focus:border-destructive':
                    errors.loadCapacity,
                })}
              />
              <InputGroupText className='bg-slate-200'>L</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Max Load</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <InputGroup>
              <Input
                {...register('maxLoad')}
                placeholder='Input maximum load item here'
                className={cn('w-full text-right', {
                  'border-destructive focus:border-destructive': errors.maxLoad,
                })}
              />
              <InputGroupText className='bg-slate-200'>kg</InputGroupText>
            </InputGroup>
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Wheels</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('wheels')}
              placeholder='Input wheels'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.wheels,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Movers</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('movers')}
              placeholder='Input movers'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.movers,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Finishing</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('finishing')}
              placeholder='Input finishing'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.finishing,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Accessories</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('accessories')}
              placeholder='Input accessories'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.accessories,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>System Filter</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('systemFilter')}
              placeholder='Input systemFilter'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.systemFilter,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>System Control</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('systemControl')}
              placeholder='Input systemControl'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.systemControl,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Power Consumption</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('powerConsumption')}
              placeholder='Input power consumption here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.powerConsumption,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Power Supply</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('powerSupply')}
              placeholder='Input powerSupply'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.powerSupply,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Input Voltage</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('inputVoltage')}
              placeholder='Input Input Voltage'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.inputVoltage,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Output Voltage</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('outputVoltage')}
              placeholder='Input Output Voltage'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.outputVoltage,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Mattress</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('mattress')}
              placeholder='Input size and thickness of mattress here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.mattress,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Cover</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('cover')}
              placeholder='Input cover here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.cover,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Side Rail</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('sideRail')}
              placeholder='Input sideRail'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.sideRail,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Side Guard</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('sideGuard')}
              placeholder='Input sideGuard'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.sideGuard,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>IV Stand</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('ivStand')}
              placeholder='Input ivStand'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.ivStand,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Stand Size</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('standSize')}
              placeholder='Input standSize'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.standSize,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Screen Type</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('typeScreen')}
              placeholder='Input screen type here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.typeScreen,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Light Pole</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('lightPole')}
              placeholder='Input light pole here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.lightPole,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Sterilizing</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('sterilizing')}
              placeholder='Input Sterilizer here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.sterilizing,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Filter</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('filter')}
              placeholder='Input filter here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.filter,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Body Framework</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('bodyFrame')}
              placeholder='Input light pole here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.bodyFrame,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Lamp</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('lamp')}
              placeholder='Input lamp here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.lamp,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Rim</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('rim')}
              placeholder='Input rim here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.rim,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Pole</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('pole')}
              placeholder='Input pole here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.pole,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Custody Feet</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('custodyFeet')}
              placeholder='Input custody feet here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.custodyFeet,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Foot Wear</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('footWear')}
              placeholder='Input foot wear here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.footWear,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Foot and Head Panel</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('footandheadPanel')}
              placeholder='Input foot wear here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.footandheadPanel,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Food Tray</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('foodTray')}
              placeholder='Input food tray here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.foodTray,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Foundation Tray</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('foundationTray')}
              placeholder='Input foundation tray here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.foundationTray,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Door</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('door')}
              placeholder='Input door here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.door,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Handle</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('handle')}
              placeholder='Input handle here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.handle,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Handle Trolley</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('handleTrolley')}
              placeholder='Input handleTrolley here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.handleTrolley,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Medicine Box</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('medicineBox')}
              placeholder='Input medicine box here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.medicineBox,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Drawer</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('drawer')}
              placeholder='Input drawer here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive': errors.drawer,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Temperature Control</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <Input
              {...register('temperatureControl')}
              placeholder='Input temperature control here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.temperatureControl,
              })}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center mt-1'>
          <div className='flex w-1/4 justify-end items-right'>
            <Label className='text-right'>Remarks</Label>
          </div>
          <div className='flex w-full gap-2 mb-2'>
            <SimpleMDE
              {...register('specremarks')}
              value={specremarks}
              onChange={(value) => setValue('specremarks', value)}
              aria-disabled={false}
              placeholder='Add remarks here'
              className={cn('w-full', {
                'border-destructive focus:border-destructive':
                  errors.specremarks,
              })}
            />
          </div>
        </div>
      </div>
    </FormGroup>
  );
};
