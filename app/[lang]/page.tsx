import { LoginForm } from '@/components/auth/login-form';

// import { Poppins } from 'next/font/google';
// const font = Poppins({
//   subsets: ['latin'],
//   weight: ['600'],
// });

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6'>
        <LoginForm />
      </div>
    </main>
  );
}
