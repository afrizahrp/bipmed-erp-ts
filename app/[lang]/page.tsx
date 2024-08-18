import { Poppins } from 'next/font/google';

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { LoginButton } from "@/components/auth/login-button";
import { LoginForm } from '@/components/auth/login-form';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6'>
        <div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
