"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icon } from "@iconify/react";

// import { SiteLogo } from '@/components/svg';
// import { loginSchema } from "@/utils/validators/login.schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(3),
  password: z.string().min(4),
  // company: z.string().min(3),
});
import { useMediaQuery } from "@/hooks/use-media-query";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      name: "afriza",
      password: "1234567",
    },
  });

  const onSubmit = (data: { name: string, password: string }) => {
    startTransition(async () => {
      let response = await signIn("credentials", {
        name: data.name,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <>
      <div className="py-2">
        <Image
          src="/images/logo/logo.svg"
          alt="logoAtlogin"
          width={180}
          height={180}
          style={{ top: 0, textAlign: "left" }}
          priority
        />
        <div className="text-2xl font-semibold text-default-300">
          Integrated System
        </div>
      </div>

      <div className="mt-6 xl:mt-8 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 2xl:mt-5">
          <div>
            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
              Username{" "}
            </Label>
            <Input
              disabled={isPending}
              {...register("name")}
              type="text"
              id="name"
              name="name"
              className={cn("", {
                "border-destructive": errors.name,
              })}
              size={!isDesktop2xl ? "lg" : "lg"}
            />
          </div>
          {errors.name && (
            <div className=" text-destructive mt-2">{errors.name.message}</div>
          )}

          <div className="mt-3.5">
            <Label
              htmlFor="password"
              className="mb-2 font-medium text-default-600"
            >
              Password{" "}
            </Label>
            <div className="relative">
              <Input
                disabled={isPending}
                {...register("password")}
                type={passwordType}
                id="password"
                className="peer "
                size={!isDesktop2xl ? "lg" : "lg"}
                placeholder=" "
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                onClick={togglePasswordType}
              >
                {passwordType === "password" ? (
                  <Icon
                    icon="heroicons:eye"
                    className="w-5 h-5 text-default-400"
                  />
                ) : (
                  <Icon
                    icon="heroicons:eye-slash"
                    className="w-5 h-5 text-default-400"
                  />
                )}
              </div>
            </div>
          </div>
          {errors.password && (
            <div className=" text-destructive mt-2">
              {errors.password.message}
            </div>
          )}

          <div className="mt-3.5">
            <Label
              htmlFor="company"
              className="mb-2 font-medium text-default-600"
            >
              Business Unit{" "}
            </Label>
            <Select name="company" disabled={isPending}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Business Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bip">bipmed</SelectItem>
                <SelectItem value="kbip">Karoseri</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5  mb-8 flex flex-wrap gap-2">
            <Button
              className="w-full"
              disabled={isPending}
              size={!isDesktop2xl ? "lg" : "md"}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Loading..." : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4"></div>
      </div>
    </>
  );
};

export default LogInForm;
