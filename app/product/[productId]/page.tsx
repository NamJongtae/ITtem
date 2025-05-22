import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";
import ProductDetailContainer from "@/domains/product/components/detail/product-detail-container";
import getProduct from "@/domains/product/api/getProduct";
import ProductDetailSkeletonUI from "@/domains/product/components/detail/product-detail-skeletonUI";

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
        <ProductDetailContainer productId={productId} />
      </Suspense>
    </>
  );
}
