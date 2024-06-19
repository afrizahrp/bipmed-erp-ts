"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/page-header";

import { toast } from "react-hot-toast";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // Don't forget to import the CSS
import { Loader2 } from "lucide-react";

import { Categories, CategoryTypes } from "@prisma/client";
import CategoryNameExist from "@/components/nameExistChecking/inventory/categoryNameExist";
import { useParams, useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

import {
  CategoryFormValues,
  categoryFormSchema,
} from "@/utils/schema/categoryFormSchema";
import { defaultValues } from "@/utils/defaultvalues/categorydefault-value";

interface CategoryFormProps {
  initialData?: Categories;
  categoryTypes: CategoryTypes[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  categoryTypes,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Add New Category";
  const description = initialData
    ? `Change Category ${initialData.id}-> ${initialData.name}`
    : "Add New Category";
  const toastMessage = initialData
    ? "Category has changed successfully."
    : "New Category has been added successfully.";
  const action = initialData ? "Save Changes" : "Save New Category";

  const pageHeader = {
    title: initialData ? "Edit Category" : "New Category",

    breadcrumb: [
      {
        name: "Inventory",
      },
      {
        name: "Categories",
        href: routes.inventory.categories,
      },
      {
        name: initialData ? "Edit Category" : "New Category",
      },
    ],
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      ...initialData,
      type: initialData?.type || undefined,
      name: initialData?.name || undefined,
      remarks: initialData?.remarks || undefined,
      iStatus: initialData?.iStatus || undefined,
      icon: initialData?.icon || undefined,
      slug: initialData?.slug || undefined,
      createdBy: initialData?.createdBy || undefined,
      createdAt: initialData?.createdAt || undefined,
      updatedBy: initialData?.updatedBy || undefined,
      updatedAt: initialData?.updatedAt || undefined,
      company: initialData?.company || undefined,
      branch: initialData?.branch || undefined,
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/inventory/categories/${params.id}`, data);
      } else {
        await axios.post(`/api/inventory/categories`, data);
      }
      router.push("/inventory/categories/category-list");
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const { href, category, ...otherFields } = field;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 gap-4 py-2">
            <div>
              <FormField
                control={form.control}
                name={"id"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Id</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="id"
                        value={field.value ?? ""}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryTypes.map((_categoryType) => (
                          <SelectItem
                            key={_categoryType.id}
                            value={_categoryType.id}
                          >
                            {_categoryType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-3/4">
            {/* <div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormControl>
                        <SearchColumn field={field.value} />
                      </FormControl>
                      {form.formState.errors.name && (
                        <FormMessage>
                          {form.formState.errors.name.message}
                        </FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div> */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <CategoryNameExist
                      currentValue={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      placeholder="Type here to add remarks"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="iStatus"
              render={({ field }) => (
                <FormItem
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 justify-self-end ${
                    field.value
                      ? "bg-slate-400 text-black"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {" "}
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {field.value ? (
                        <span className="text-red text-semibold">
                          Non Active
                        </span>
                      ) : (
                        <span className="text-green">Active</span>
                      )}{" "}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <span className="text-black">
                          This category will not be shown during transaction
                          input
                        </span>
                      ) : (
                        <span className="text-white">
                          This category will be shown during transaction input
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              onClick={(event) => {
                event.stopPropagation();
                router.push("/inventory/categories/category-list");
              }}
            >
              Back
            </Button>
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
