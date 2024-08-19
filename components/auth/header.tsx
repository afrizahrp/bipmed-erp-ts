import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-1 items-center justify-center mb-0 drop-shadow-md'>
      <Image
        src='/images/logo/logo.svg'
        alt='logoAtlogin'
        width={120}
        height={120}
        style={{ top: 0, textAlign: 'left' }}
        priority
      />
      <h1
        className={cn(
          'text-md font-semibold text-[#0063A4] drop-shadow-md',
          font.className
        )}
      >
        {label}
      </h1>
    </div>
  );
};
