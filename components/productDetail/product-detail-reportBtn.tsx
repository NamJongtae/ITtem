import useProductReportMutate from "@/hooks/querys/useProductReportMutate";
import { RootState } from "@/store/store";
import { ProductDetailData } from "@/types/productTypes";
import Image from "next/image";
import { useSelector } from "react-redux";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailReportBtn({ productDetailData }: IProps) {
  const { productReportMutate } = useProductReportMutate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    productDetailData?.uid !== user?.uid && (
      <button
        type="button"
        onClick={() => productReportMutate()}
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
