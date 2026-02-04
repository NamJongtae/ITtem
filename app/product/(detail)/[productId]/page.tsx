import { cache, Suspense } from "react";
import ProductDetailPrefetchBoundary from "@/domains/product/detail/components/ProductDetailPrefetchBoundary";
import ProductDetailSkeletonUI from "@/domains/product/detail/components/ProductDetailSkeletonUI";
import getProduct from "@/domains/product/shared/api/getProduct";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

export const revalidate = 180;

export const getProductCached = cache((id: string) => getProduct(id));

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;

  if (!productId) {
    return {
      ...BASE_METADATA,
      title: "ITtem | 존재하지 않는 상품",
      openGraph: {
        ...BASE_METADATA.openGraph,
        title: "존재하지 않는 상품"
      }
    };
  }

  const res = await getProductCached(productId);

  const product = res.product;

  if (product) {
    return {
      title: `ITtem | ${product.block ? "블라인드 상품" : product.name}`,
      openGraph: {
        title: product.block ? "블라인드 상품" : product.name
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
        <ProductDetailPrefetchBoundary productId={productId} />
      </Suspense>
    </>
  );
}
