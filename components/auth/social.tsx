'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='sm'
        className='w-full relative'
        variant='outline'
        // className='w-full bg-white text-black hover:bg-customGreen hover:text-white'

        onClick={() => onClick('google')}
      >
        <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
        Login with google
      </Button>
    </div>
  );
};
