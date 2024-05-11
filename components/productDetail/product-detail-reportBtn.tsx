import useMyProfileQuery from "@/hooks/querys/useMyProfileQuery";
import useProductReportMutate from "@/hooks/querys/useProductReportMutate";
import { ProductDetailData } from "@/types/productTypes";
import Image from "next/image";
import { toast } from "react-toastify";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailReportBtn({ productDetailData }: IProps) {
  const { productReportMutate } = useProductReportMutate();
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const isReport = productDetailData?.reportUserIds.includes(
    myProfileData?.uid || ""
  );

  const handleClickReport = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isReport) {
      toast.warn("이미 신고한 상품이에요.");
    } else {
      productReportMutate(undefined);
    }
  };

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
