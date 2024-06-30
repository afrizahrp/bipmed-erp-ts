import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface LoginHeaderProps {
  label: string;
}

export const LoginHeader = ({ label }: LoginHeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      {/* <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 Auth</h1> */}
      {/* <div className='py-2'> */}
      <Image
        src='/images/logo/logo.svg'
        alt='logoAtlogin'
        width={140}
        height={140}
        priority
      />
      {/* <div className='text-2xl font-semibold text-default-400'>erpLite</div> */}
      {/* </div> */}

      <p className='text-muted-foreground text-2xl font-semibold'>{label}</p>
    </div>
  );
};
