'use client';
import React from 'react';
import { Poppins } from 'next/font/google';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Icon } from '@iconify/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const schema = z.object({
  name: z.string().min(3),
  password: z.string().min(4),
  // company: z.string().min(3),
});
import { useMediaQuery } from '@/hooks/use-media-query';
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');

  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      name: 'afriza',
      password: '1234567',
    },
  });

  const onSubmit = (data: { name: string; password: string }) => {
    startTransition(async () => {
      let response = await signIn('credentials', {
        name: data.name,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Login Successfully');
        window.location.assign('/inventory');
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <>
      <div className='w-full flex flex-col items-center justify-center pb-7'>
        <Image
          src='/images/logo/logo.svg'
          alt='logoAtlogin'
          width={140}
          height={140}
          style={{ top: 0, textAlign: 'left' }}
          priority
        />
        {/* <div className='text-2xl font-semibold text-default-400'>erpLite</div> */}
        <h1
          className={cn(
            'text-2xl font-semibold text-[#0063A4]',
            font.className
          )}
        >
          erpLite
        </h1>
      </div>

      <div className='mt-6 xl:mt-8 w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-2 2xl:mt-5'>
          <div className='relative'>
            <Input
              removeWrapper
              type='name'
              id='name'
              size={!isDesktop2xl ? 'xl' : 'lg'}
              placeholder=' '
              disabled={isPending}
              {...register('name')}
              className={cn('peer', {
                'border-destructive': errors.name,
              })}
            />
            <Label
              htmlFor='name'
              className={cn(
                ' absolute text-base text-default-600  rounded-t duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                {
                  ' text-sm ': isDesktop2xl,
                }
              )}
            >
              Username
            </Label>
          </div>
          {errors.name && (
            <div className=' text-destructive mt-2'>{errors.name.message}</div>
          )}

          <div className='relative mt-6'>
            <Input
              removeWrapper
              type={passwordType === 'password' ? 'password' : 'text'}
              id='password'
              size={!isDesktop2xl ? 'xl' : 'lg'}
              placeholder=' '
              disabled={isPending}
              {...register('password')}
              className={cn('peer', {
                'border-destructive': errors.password,
              })}
            />
            <Label
              htmlFor='password'
              className={cn(
                ' absolute text-base  rounded-t text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                {
                  ' text-sm ': isDesktop2xl,
                }
              )}
            >
              Password
            </Label>
            <div
              className='absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer'
              onClick={togglePasswordType}
            >
              {passwordType === 'password' ? (
                <Icon
                  icon='heroicons:eye'
                  className='w-4 h-4 text-default-400'
                />
              ) : (
                <Icon
                  icon='heroicons:eye-slash'
                  className='w-4 h-4 text-default-400'
                />
              )}
            </div>
          </div>
          {errors.password && (
            <div className=' text-destructive mt-2'>
              {errors.password.message}
            </div>
          )}

          <div className='relative mt-6'>
            <Label
              htmlFor='unit'
              className={cn(
                ' absolute text-base  rounded-t text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                {
                  ' text-sm ': isDesktop2xl,
                }
              )}
            >
              Business Unit
            </Label>
            {/* Business Unit{' '}
            </Label> */}
            <Select name='company' disabled={isPending}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Business Unit' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='bip'>bipmed</SelectItem>
                <SelectItem value='kbip'>Karoseri</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='mt-5  mb-8 flex flex-wrap gap-2'>
            <Button
              className='w-full'
              disabled={isPending}
              size={!isDesktop2xl ? 'lg' : 'md'}
            >
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isPending ? 'Loading...' : 'Sign In'}
            </Button>
          </div>
        </form>
        <div className='mt-6 xl:mt-8 flex flex-wrap justify-center gap-4'></div>
      </div>
    </>
  );
};

export default LogInForm;
