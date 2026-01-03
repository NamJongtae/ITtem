import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";
import PageContainer from "@/domains/product/detail/components/PageContainer";
import ProductDetailSkeletonUI from "@/domains/product/detail/components/ProductDetailSkeletonUI";

export const revalidate = 180;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;
  const res = await fetch(`${BASE_URL}/api/product/${productId}`);

  const data = await res.json();
  const product = data.product;

  if (product) {
    return {
      title: `ITtem | ${product.name}`,
      openGraph: {
        title: product.name
      }
    };
  } else {
    return {
      title: "ITtem | 삭제된 상품",
      openGraph: {
        title: "삭제된 상품"
      }
    };
  }
}

export default async function ProductDetail({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;

  return (
    <>
      <Suspense fallback={<ProductDetailSkeletonUI userUid={productId} />}>
        <PageContainer productId={productId} />
      </Suspense>
    </>
  );
}
