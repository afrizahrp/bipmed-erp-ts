'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { useMediaQuery } from '@/hooks/use-media-query';

import { LoginSchema } from '@/utils/schema/login.schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Icon } from '@iconify/react';

import { login } from '@/actions/login';
import { cn } from '@/lib/utils';

export const LoginFormRemoveWrapper = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') ?? '';
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const [passwordType, setPasswordType] = useState('password');

  const [isPending, startTransition] = useTransition();

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
    clearErrors,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            reset();
            setError(data.error);
          }

          if (data?.success) {
            reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel='Integrated Systems'
      backButtonLabel="Don't have an account ?"
      backButtonHref='/auth/register'
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          {showTwoFactor && (
            <>
              <Input
                removeWrapper
                type='code'
                id='code'
                size={!isDesktop2xl ? 'xl' : 'lg'}
                placeholder=' '
                disabled={isPending}
                className={cn('peer', {
                  'border-destructive': errors.name,
                })}
              />
              <Label
                htmlFor='code'
                className={cn(
                  ' absolute text-base text-default-600  rounded-t duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                  {
                    ' text-sm ': isDesktop2xl,
                  }
                )}
              >
                Code
              </Label>
            </>
          )}

          {!showTwoFactor && (
            <>
              <div className='relative'>
                <Input
                  removeWrapper
                  type='name'
                  id='name'
                  size={!isDesktop2xl ? 'xl' : 'lg'}
                  placeholder=' '
                  disabled={isPending}
                  {...register('name', {
                    onBlur: () => {
                      clearErrors('name');
                    },
                  })}
                  className={cn('peer', {
                    'border-destructive': errors.name,
                  })}
                />
                <Label
                  htmlFor='name'
                  className={cn(
                    'absolute text-base text-default-600 rounded-t duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                    {
                      'text-sm': isDesktop2xl,
                    }
                  )}
                >
                  Username
                </Label>
              </div>
              {errors.name && (
                <div className='text-destructive mt-0'>
                  {errors.name.message}
                </div>
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
                <div className=' text-destructive mt-0'>
                  {errors.password.message}
                </div>
              )}

              <Button
                size='sm'
                variant='link'
                asChild
                disabled={isPending}
                className='px-0 font-normal text-sm bg-transparent text-black hover:bg-white'
              >
                {isPending ? (
                  <span className='text-black'>Forgot password ?</span>
                ) : (
                  <Link href='/auth/reset'>Forgot password ?</Link>
                )}
              </Button>
            </>
          )}
          {/* <FormError message={error || urlError} />
          <FormSuccess message={success} /> */}
          <Button disabled={isPending} type='submit' className='w-full'>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
