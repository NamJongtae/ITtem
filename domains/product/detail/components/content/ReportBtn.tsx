import { ProductDetailData } from "../../types/productDetailTypes";
import Image from "next/image";
import useProductReportHandler from "../../hooks/useProductReportHandler";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ReportBtn({ productDetailData }: IProps) {
  const { myProfilePending, myProfileData, handleClickReport } =
    useProductReportHandler({
      reportUserIds: productDetailData?.reportUserIds
    });

  const isMyProduct = productDetailData?.uid === myProfileData?.uid;

  if (myProfilePending || isMyProduct) return null;

  return (
    <button
      type="button"
      onClick={handleClickReport}
      className="flex items-center gap-1"
    >
      <Image
        src={"/icons/report-icon.svg"}
        alt="신고하기"
        width={28}
        height={28}
      />{" "}
      신고하기
    </button>
  );
}
