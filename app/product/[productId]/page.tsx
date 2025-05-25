import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";
import PageContainer from "@/domains/product/detail/components/PageContainer";
import getProduct from "@/domains/product/shared/api/getProduct";
import ProductDetailSkeletonUI from "@/domains/product/detail/components/ProductDetailSkeletonUI";

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;
  const url = `${BASE_URL}/product/${productId}`;
  let title;

  if (productId) {
    try {
      const response = await getProduct(productId);
      const product = response.data.product;
      title = `ITtem | ${product.name}`;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
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
