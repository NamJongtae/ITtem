import Spinner from "@/components/commons/spinner";
import Header from "@/components/product/product-header";
import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";
import ProductContainer from '@/components/product/product-container';

export async function generateMetadata({
  searchParams
}: {
  searchParams: { category: string | undefined };
}) {
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
  searchParams: { category: string | undefined };
}) {
  const category = searchParams.category || "";

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex max-w-[1024px] mx-auto pt-52 justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <ProductContainer category={category} />
      </Suspense>
    </>
  );
}
