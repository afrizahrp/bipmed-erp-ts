'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/Label_T';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input_T';
import { Button } from '@/components/ui/button_T';
import { Separator } from '@/components/ui/separator_T';
// import dynamic from 'next/dynamic';
// import { ToggleColumns } from '@/components/ui/table';
// import { PiMagnifyingGlassBold, PiFunnel, PiXBold } from 'react-icons/pi';
// import { Button, ActionIcon, Input, Title } from 'rizzui';
// import cn from '@/utils/class-names';
// import { useMedia } from '@/hooks/use-media';

// const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
//   ssr: false,
// });

export function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}>) {
  return (
    <div>
      <Sheet open={isOpen ?? false}>
        {/* <SheetTrigger asChild>
        <Button variant='outline'>Open</Button>
      </SheetTrigger> */}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter data</SheetTitle>
            <SheetDescription>
              To get more specific data you needs
            </SheetDescription>
            <Separator />
          </SheetHeader>
          <div className='grid gap-4 py-4'>{children}</div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type='submit'
                onClick={() => setOpenDrawer(false)}
                className='w-full'
              >
                Back
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
