import { ProductDetailData } from "@/types/productTypes";
import Image from "next/image";
import useProductDetailReportBtn from "@/hooks/productDetail/useProductDetailReportBtn";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailReportBtn({ productDetailData }: IProps) {
  const { loadMyProfileLoading, myProfileData, handleClickReport } =
    useProductDetailReportBtn({
      reportUserIds: productDetailData?.reportUserIds,
    });

  return (
    !loadMyProfileLoading &&
    productDetailData?.uid !== myProfileData?.uid && (
      <button
        type="button"
        onClick={handleClickReport}
        className="flex items-center gap-1"
      >
        <Image
          src={"/icons/report_icon.svg"}
          alt="신고하기"
          width={28}
          height={28}
        />{" "}
        신고하기
      </button>
    )
  );
}
