import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";
import ProductManagePage from "@/domains/product/manage/components/ProductManagePage";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...BASE_METADATA,
  metadataBase: new URL(`${BASE_URL}/product/maange`),
  title: "ITtem | 상품관리",
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${BASE_URL}/product/maange`,
    title: "ITtem | 상품관리"
  }
};

export default function ProductManage() {
  return <ProductManagePage />;
}
