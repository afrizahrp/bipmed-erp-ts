"use client";
import Image from "next/image";
import LogInForm from "@/components/auth/login-form";

// import LogInForm from './login-form';
import auth3Light from "@/public/images/auth/auth3-light.png";
import auth3Dark from "@/public/images/auth/auth3-dark.png";
const LoginPage = () => {
  return (
    // <div className='loginwrapper  flex justify-center items-center relative overflow-hidden'>

    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      {/* <div className='sm:shadow-xl px-4 pb-10 pt-6 sm:bg-white rounded-xl flex flex-col items-center space-y-2'> */}
      <Image
        src={auth3Dark}
        alt="background image"
        className="absolute top-0 left-0 w-full h-full light:hidden"
      />
      <Image
        src={auth3Light}
        alt="background image"
        className="absolute top-0 left-0 w-full h-full dark:hidden"
      />
      <div className="w-full bg-background   py-5 max-w-lg  rounded-lg relative z-10 2lg:p-16 lg:p-12 p-10 m-4 ">
        <LogInForm />
      </div>
    </div>
  );
};

export default LoginPage;
