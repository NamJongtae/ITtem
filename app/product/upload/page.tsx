import ProductUploadPage from "@/domains/product/components/upload/product-upload-page";
import { BASE_URL } from "@/constants/constant";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductUploadLoading from "./loading";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/product/upload`),
  title: "ITtem | 상품판매",
  openGraph: {
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
