'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import PageHeader from '@/components/page-header';
import FormFooter from '@/components/form-footer';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget to import the CSS
import { toast } from 'react-hot-toast';

import {
  Products,
  SubCategories,
  ProductImages,
  Categories,
  Brands,
  Uoms,
} from '@prisma/client';

import { useParams, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ProductNameExist from '@/components/nameExistChecking/inventory/productNameExist';
import {
  SearchColumnProductCategory,
  SearchColumnUom,
  SearchColumnBrand,
} from '@/components/searchColumns';

import ImageCollection from '@/components/ui/images-collection';
import { Switch } from '@/components/ui/switch';
// import { Checkbox } from '@/components/ui/checkbox';

import { Separator } from '@/components/ui/separator';
import {
  ProductFormValues,
  productFormSchema,
} from '@/utils/schema/product.form.schema';
import ImageUpload from '@/components/ui/image-upload';
import FormGroup from '@/components/form-group';

interface FinishGoodsFormProps {
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
  categories: Categories[];
  subCategories: SubCategories[];
  brands: Brands[];
  uoms: Uoms[];
}

export const FinishGoodsForm: React.FC<FinishGoodsFormProps> = ({
  initialData,
  subCategories,
  categories,
  brands,
  uoms,
}) => {
  const params = useParams();
  const router = useRouter();

  const [searchTerms, setSearchTerms] = useState('');
  const [loading, setLoading] = useState(false);
  const id = initialData?.id;

  const actionMessage = initialData
    ? 'Finish Goods has changed successfully.'
    : 'New Finish Goods has been added successfully.';

  const pageHeader = {
    title: initialData ? 'Edit Finish Goods' : 'New Finish Goods',

    breadcrumb: [
      {
        name: 'Dashboard',
        href: routes.production.dashboard,
      },
      {
        name: 'List',
        href: routes.production.products,
      },
      {
        name: initialData ? 'Finish Goods' : 'Finish Goods',
      },
    ],
  };

  const defaultValues = initialData
    ? {
        ...initialData,
        images: initialData?.images || [],
        catalog_id: initialData?.catalog_id ?? '',
        registered_id: initialData?.registered_id ?? '',
        id: initialData?.id ?? '',
        name: initialData?.name ?? '',
        category_id: initialData?.category_id ?? '',
        subCategory_id: initialData?.subCategory_id ?? '',
        brand_id: initialData?.brand_id ?? '',
        uom_id: initialData?.uom_id ?? '',
        tkdn_pctg: initialData?.tkdn_pctg ?? 0,
        bmp_pctg: initialData?.bmp_pctg ?? 0,
        ecatalog_URL: initialData?.ecatalog_URL ?? '',
        iStatus: initialData?.iStatus ?? true,
        remarks: initialData?.remarks || undefined,
        isMaterial: initialData?.isMaterial ?? false,
        slug: initialData?.slug ?? '',
      }
    : {
        images: [],
        catalog_id: undefined,
        registered_id: undefined,
        id: '',
        name: '',
        category_id: '',
        subCategory_id: '',
        brand_id: '',
        uom_id: '',
        tkdn_pctg: 0,
        bmp_pctg: 0,
        ecatalog_URL: '',
        iStatus: true,
        remarks: '',
        isMaterial: false,
        slug: '',
        iShowedStatus: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const {
    register,
    formState: { errors },
  } = useFormContext();

  // const onSubmit = async (data: ProductFormValues) => {
  //   try {
  //     setLoading(true);
  //     if (initialData) {
  //       await axios.patch(`/api/inventory/products/${params.id}`, data);
  //     } else {
  //       console.log('add new product', data);
  //       await axios.post(`/api/inventory/products`, data);
  //     }
  //     router.push('/production/finish-goods/finish-goods-list');
  //     router.refresh();
  //     toast.success(actionMessage);
  //   } catch (error: any) {
  //     console.error(error);

  //     toast.error(error.response?.data?.message || 'Save failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const selectedCategoryId = form.watch('category_id');

  useEffect(() => {
    const selectedSubCategory = form.watch('subCategory_id');
    const subCategoryBelongsToCategory =
      subCategories &&
      subCategories.some(
        (subCategory) =>
          subCategory.id === selectedSubCategory &&
          subCategory.category_id === selectedCategoryId
      );

    if (!subCategoryBelongsToCategory) {
      form.setValue('subCategory_id', '');
    }
  }, [selectedCategoryId, form.setValue, form.watch, subCategories]);

  const onProductNameChange = (newCategoryName: string) => {
    setSearchTerms(newCategoryName);
  };

  return (
    <>
      <FormGroup
        title='General Product Information'
        description='Edit product general product information from here'
      ></FormGroup>
    </>
  );
};
