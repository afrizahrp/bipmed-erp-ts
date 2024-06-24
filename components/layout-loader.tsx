"use client";
import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
// import { SiteLogo } from "@/components/svg";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2 top-3">
      {/* <SiteLogo className=" h-6 w-6 text-primary" /> */}
      <Image
        src="/images/logo/logo.svg"
        alt="layoutLoaderLogo"
        width={100}
        height={100}
        priority
      />
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait while loading ...
      </span>
    </div>
  );
};

export default LayoutLoader;



