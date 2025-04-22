import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";
import ProductDetailContainer from "@/components/product-detail/product-detail-container";
import { getProduct } from "@/lib/api/product";
import ProductDetailSkeletionUI from "@/components/product-detail/product-detail-skeletionUI";

export async function generateMetadata({
  params
}: {
  params: { productId: string | undefined };
}) {
  const url = `${BASE_URL}/product/${params.productId}`;
  let title;

  if (params.productId) {
    try {
      const response = await getProduct(params.productId);
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
  params: { productId: string | undefined };
}) {
  return (
    <>
      <Suspense
        fallback={<ProductDetailSkeletionUI userUid={params.productId} />}
      >
        <ProductDetailContainer params={params} />
      </Suspense>
    </>
  );
}
