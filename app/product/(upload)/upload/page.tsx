import ProductUploadPage from "@/domains/product/upload/components/ProductUploadPage";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductUploadLoading from "./loading";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

export const metadata: Metadata = {
  ...BASE_METADATA,
  metadataBase: new URL(`${BASE_URL}/product/upload`),
  title: "ITtem | 상품판매",
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${BASE_URL}/product/upload`,
    title: "ITtem | 상품판매"
  }
};

export default function ProductUpload() {
  return (
    <Suspense fallback={<ProductUploadLoading isEdit={false} />}>
      <ProductUploadPage />
    </Suspense>
  );
}
