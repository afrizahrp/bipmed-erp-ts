'use client';
import {
  Products,
  Categories,
  SubCategories,
  Brands,
  Uoms,
  ProductImages,
} from '@prisma/client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs_T';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card_T';
import { cn } from '@/lib/utils';
import { ProductForm } from './product-form';
import { Input } from '@/components/ui/input_T';
import { Label } from '@/components/ui/Label_T';
import { Button } from '@/components/ui/button_T';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormGroup from '@/app/shared/form-group';
// import ProductDetailPage from "./components";
interface ProductDetailProps {
  initialData:
    | (Products & {
        images: ProductImages[];
      })
    | null;
  products: Products[];
  categories: Categories[];
  subCategories: SubCategories[];
  brands: Brands[];
  uoms: Uoms[];
}
export const ProductDetail: React.FC<ProductDetailProps> = ({
  products,
  categories,
  subCategories,
  brands,
  uoms,
}) => {
  return (
    <>
      <Tabs defaultValue='general' className='md:w-full'>
        <TabsList className='grid w-full grid-cols-5 sticky top-0'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='specs'>Specifications</TabsTrigger>
          <TabsTrigger value='stock'>Stock</TabsTrigger>
          <TabsTrigger value='price'>Price</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <Card>
            <CardContent className='space-y-2'>
              <ProductForm
                initialData={products}
                categories={categories}
                subCategories={subCategories}
                brands={brands}
                uoms={uoms}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='image'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductDetail;
