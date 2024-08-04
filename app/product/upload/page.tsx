import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { BASE_URL } from "@/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/product/upload`),
  title: "ITtem | 상품판매",
  openGraph: {
    url: `${BASE_URL}/product/upload`,
    title: "ITtem | 상품판매",
  },
};

export default function Upload() {
  return (
    <>
      <ProductUploadPage isEdit={false} />
    </>
  );
}
