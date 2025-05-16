import Header from "@/components/product/product-header";
import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";
import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";
import CategoryProductListContainer from "@/components/product/category-product-list-container";
import { ErrorBoundary } from "@/components/commons/ErrorBoundary";
import ProductListError from "@/components/commons/product-list/product-list-error";

export async function generateMetadata(props: {
  searchParams: Promise<{ category: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "전체";
  const title = category ? `ITtem | 상품-${category}` : "ITtem | 상품-전체";
  const url = `${BASE_URL}/product?category=${category}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default async function Product({
  searchParams
}: {
  searchParams: Promise<{ category: string | undefined }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <ul className="max-w-[1024px] mx-auto grid gap-5 grid-cols-autoFill mt-6 px-8">
            <ProductListSkeletonUI listCount={8} />
          </ul>
        }
      >
        <ErrorBoundary
          fallback={<ProductListError productListType="CATEGORY" />}
        >
          <CategoryProductListContainer category={category} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
