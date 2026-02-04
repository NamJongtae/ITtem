import CategoryHeader from "@/domains/product/category/CategoryHeader";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";
import CategoryProductListContainer from "@/domains/product/category/CategoryProductListContainer";
import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

interface IProps {
  params: Promise<{ categoryId: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return CATEGORY.map((_, id) => ({
    categoryId: id.toString()
  }));
}

export async function generateMetadata() {
  const title = "ITtem | 상품";
  const url = `${BASE_URL}/product`;

  return {
    ...BASE_METADATA,
    metadataBase: new URL(url),
    title,
    openGraph: {
      ...BASE_METADATA.openGraph,
      url,
      title
    }
  };
}

export default async function Product({ params }: IProps) {
  const { categoryId } = await params;
  const category = (CATEGORY[Number(categoryId)] ??
    ProductCategory.전체) as ProductCategory;

  return (
    <>
      <CategoryHeader />
      <Suspense fallback={<ProductListSkeletonUI listCount={12} />}>
        <CategoryProductListContainer category={category} />
      </Suspense>
    </>
  );
}
