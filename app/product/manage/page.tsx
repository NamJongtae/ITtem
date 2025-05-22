import ProductManagePage from "@/domains/product/components/manage/product-manage-page";
import { BASE_URL } from "@/constants/constant";

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { status } = await searchParams;

  const transformStatus =
    status === "CANCEL_END/RETURN_END"
      ? "취소/반품 내역"
      : status === "TRADING_END"
        ? "거래완료 내역"
        : status === "CANCEL_REJECT/RETURN_REJECT"
          ? "취소/반품 거절 내역"
          : "거래중";

  const url = `${BASE_URL}/manage?status=${transformStatus}`;
  const title = `ITtem | 상품관리-${transformStatus}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default function ProductManage() {
  return <ProductManagePage />;
}
