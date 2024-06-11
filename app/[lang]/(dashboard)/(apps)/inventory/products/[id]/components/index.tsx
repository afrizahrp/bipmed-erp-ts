"use client";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "@/utils/class-names";

import ProductGeneral from "./product-general";
import { defaultValues } from "./form-utils";
import PageHeader from "@/components/page-header";
import FormFooter from "@/components/form-footer";
import {
  CreateProductInput,
  productFormSchema,
} from "@/utils/validators/create-product.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card_T";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs_T";
import { routes } from "@/config/routes";

interface IndexProps {
  initialData: any;
  categories: any;
  subCategories: any;
  brands: any;
  uoms: any;
  className?: string;
}

// console.log(productSpecData);
export default function ProductDetailPage({
  initialData,
  categories,
  subCategories,
  brands,
  uoms,
  className,
}: IndexProps) {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...defaultValues(initialData ?? {}),
    },
  });

  const pageHeader = {
    title: initialData ? "Edit Product" : "New Product",

    breadcrumb: [
      {
        name: "Inventory",
      },
      {
        name: "Products",
        href: routes.inventory.products,
      },
      {
        name: initialData ? "Edit Product" : "New Product",
      },
    ],
  };

  const description = initialData
    ? `Change Product ${initialData.id}-> ${initialData.name}`
    : "Add New Product";
  const toastMessage = initialData
    ? "Changes has saved successfully."
    : "New product has been saved successfully";
  const action = initialData ? "Save Changes" : "Save New Product";

  const onBack = () => {
    setLoading(false);
    router.push("/inventory/products/product-list");
  };

  const id = initialData?.id;
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/products/${id}`, data);
        // await axios.patch(`/api/inventory/productSpecs/${id}`, data);
      } else {
        await axios.post(`/api/inventory/products`, data);
      }

      router.push("/inventory/products/product-list");
      router.refresh();
      toast.success(toastMessage);
      setLoading(false);
    } catch (error: any) {
      console.error(error); // Log the error to the console for debugging

      toast.error(error.response?.data?.message || "Save changes failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="w-full space-y-4">
        {/* <FormNav className={cn('z-[999] 2xl:top-[65px]')} /> */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={cn(
              "relative z-[19] [&_label.block>span]:font-medium",
              className
            )}
          >
            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <Tabs
                defaultValue="generalInfo"
                className="w-full sticky top-[65px]"
              >
                <TabsList className=" bg-white p-0 border-b-2  rounded-none">
                  <TabsTrigger value="generalInfo">General</TabsTrigger>
                  <TabsTrigger value="specInfo">Specification</TabsTrigger>
                </TabsList>
                <TabsContent value="generalInfo">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Information</CardTitle>
                      <CardDescription>
                        Make changes general product information here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <ProductGeneral
                          categories={categories}
                          subCategories={subCategories}
                          brands={brands}
                          uoms={uoms}
                          loading={isLoading}
                        />

                        {/* <ProductForm
                          initialData={initialData}
                          categories={categories}
                          subCategories={subCategories}
                          brands={brands}
                          uoms={uoms}
                        /> */}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="specInfo">
                  <Card>
                    <CardHeader>
                      <CardTitle>Specification</CardTitle>
                      <CardDescription>
                        Edit product specification information here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        This is for the product specification
                        {/* <ProductSpecForm specData={specData} /> */}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <FormFooter
              isLoading={isLoading}
              handleAltBtn={() => onBack()}
              submitBtnText={initialData ? "Update Product" : "Save Product"}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
